import pandas as pd
from sklearn.base import accuracy_score
from sklearn.metrics import classification_report
from backend.Client.broker.Consumer import Consumer
from backend.Client.middleware.Networks import ANN, FullyConnected, MSE, MSE_P
from sklearn.preprocessing import StandardScaler


class FLModel:
    def __init__(self, config_file, deviceName) -> None:
        self.deviceName = deviceName
        self.config = config_file
        self.consumer = Consumer()
        self.scaler = StandardScaler()
        self.net = ANN(
            self.config["DEFAULT"]["OutputDimension"],
            self.config["DEFAULT"]["InputDimension"],
            self.config["DEFAULT"]["Precision"],
        )
        self.net.add_layer(
            FullyConnected(
                self.config["DEFAULT"]["InputDimension"],
                self.config["DEFAULT"]["OutputDimension"],
            ),
            self.config["DEFAULT"]["ActivationFunction"],
        )
        self.epochs = self.config["DEFAULT"]["Epochs"]
        self.net.set_loss(MSE, MSE_P)
        self.lr = None
        self.curr_batch = None
        self.batchSize = None
        self.x_train = None
        self.y_train = None
        datasource = self.config["DEFAULT"]["TestFilePath"]
        testdata = pd.read_csv(
            datasource,
            names=[
                "T_xacc",
                "T_yacc",
                "T_zacc",
                "T_xgyro",
                "T_ygyro",
                "T_zgyro",
                "T_xmag",
                "T_ymag",
                "T_zmag",
                "RA_xacc",
                "RA_yacc",
                "RA_zacc",
                "RA_xgyro",
                "RA_ygyro",
                "RA_zgyro",
                "RA_xmag",
                "RA_ymag",
                "RA_zmag",
                "LA_xacc",
                "LA_yacc",
                "LA_zacc",
                "LA_xgyro",
                "LA_ygyro",
                "LA_zgyro",
                "LA_xmag",
                "LA_ymag",
                "LA_zmag",
                "RL_xacc",
                "RL_yacc",
                "RL_zacc",
                "RL_xgyro",
                "RL_ygyro",
                "RL_zgyro",
                "RL_xmag",
                "RL_ymag",
                "RL_zmag",
                "LL_xacc",
                "LL_yacc",
                "LL_zacc",
                "LL_xgyro",
                "LL_ygyro",
                "LL_zgyro",
                "LL_xmag",
                "LL_ymag",
                "LL_zmag",
                "Activity",
            ],
        )
        testdata.fillna(inplace=True, method="backfill")
        testdata.dropna(inplace=True)
        testdata.drop(
            columns=[
                "T_xacc",
                "T_yacc",
                "T_zacc",
                "T_xgyro",
                "T_ygyro",
                "T_zgyro",
                "T_xmag",
                "T_ymag",
                "T_zmag",
                "RA_xacc",
                "RA_yacc",
                "RA_zacc",
                "RA_xgyro",
                "RA_ygyro",
                "RA_zgyro",
                "RA_xmag",
                "RA_ymag",
                "RA_zmag",
                "RL_xacc",
                "RL_yacc",
                "RL_zacc",
                "RL_xgyro",
                "RL_ygyro",
                "RL_zgyro",
                "RL_xmag",
                "RL_ymag",
                "RL_zmag",
                "LL_xacc",
                "LL_yacc",
                "LL_zacc",
                "LL_xgyro",
                "LL_ygyro",
                "LL_zgyro",
                "LL_xmag",
                "LL_ymag",
                "LL_zmag",
            ],
            inplace=True,
        )
        activity_mapping = self.config["DEFAULT"]["ActivityMappings"]
        filtered_activities = self.config["DEFAULT"]["Activities"]
        activity_encoding = self.config["DEFAULT"]["ActivityEncoding"]
        for key in activity_mapping.keys():
            testdata.loc[testdata["Activity"] == key, "Activity"] = activity_mapping[
                key
            ]
        testdata = testdata[testdata["Activity"].isin(filtered_activities)]
        for key in activity_encoding.keys():
            testdata.loc[testdata["Activity"] == key, "Activity"] = activity_encoding[
                key
            ]
        self.x_test = testdata.drop(columns="Activity")
        self.y_test = testdata["Activity"]

    def test_model(self):
        x_test = self.scaler.transform(self.x_test.to_numpy())
        pred = self.net.predict(x_test)
        return accuracy_score(self.y_test, self.net.predict(x_test))

    def get_classification_report(self):
        x_test = self.scaler.transform(self.x_test.to_numpy())
        return classification_report(
            self.y_test, self.net.predict(x_test), zero_division=0, output_dict=True
        )

    def process_Batch(self):
        self.curr_batch.dropna(inplace=True)
        batch = self.curr_batch.sample(self.batchSize)
        self.x_train = batch.drop(columns=self.config["DEFAULT"]["ResponseVariable"])
        self.y_train = batch[self.config["DEFAULT"]["ResponseVariable"]]
        self.x_train = self.x_train.to_numpy()
        self.y_train = self.y_train.to_numpy()
        self.scaler.fit(self.x_test.to_numpy())
        self.x_train = self.scaler.transform(self.x_train)
        self.net.fit(
            self.x_train,
            self.y_train,
            epochs=self.epochs,
            learning_rate=self.learning_rate,
        )
        score = self.test_model()
        print(f"{self.deviceName}:Score :", score)

    def reset_batch(self):
        self.curr_batch = None
        self.x_train = None
        self.y_train = None

    def get_weights(self):
        return self.net.get_weights()

    def get_bias(self):
        return self.net.get_bias()

    def set_learning_rate(self, rate):
        self.learning_rate = rate

    def set_weights(self, weights):
        self.net.set_weights(weights)

    def set_bias(self, bias):
        self.net.set_bias(bias)

    def set_batchSize(self, batchSize):
        self.batchSize = batchSize

    def set_precision(self, precision):
        self.net.set_precision(precision)

    def add_data_to_current_batch(self, data):
        if self.curr_batch is None:
            self.curr_batch = data
        else:
            self.curr_batch = pd.concat([self.curr_batch, data])
