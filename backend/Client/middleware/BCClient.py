import json
import threading
import time
import numpy as np
from web3 import Web3


class Connection:
    def __init__(self, config_file):
        self.config = config_file
        self.web3Connection = None
        self.ABI_FLcontract = None
        self.Deployed_FLcontract = None
        self.Address_FLcontract = self.config["DEFAULT"]["FLContractAddress"]
        self.newRoundLock = threading.Lock()
        self.precision = None

    def connect(self):
        self.web3Connection = Web3(
            Web3.HTTPProvider(
                self.config["DEFAULT"]["EtheriumRPCServer"],
                request_kwargs={"timeout": 60 * 10},
            )
        )

        with open(self.config["DEFAULT"]["FLContractABIPAth"]) as f:
            self.FLcontractABI = json.load(f)["abi"]

        self.Deployed_FLcontract = self.web3Connection.eth.contract(
            address=self.FLcontractAddress, abi=self.FLcontractABI
        )

    def initial_contract(self, accountNR):
        if self.isConnect() and accountNR == 0:
            np.random.seed(4)

            weights = (
                np.random.randn(
                    self.config["DEFAULT"]["OutputDimension"],
                    self.config["DEFAULT"]["InputDimension"],
                )
                * self.config["DEFAULT"]["Precision"]
                / 5
            )
            weights = [[int(x) for x in y] for y in weights]

            bias = (
                np.random.randn(
                    self.config["DEFAULT"]["OutputDimension"],
                )
                * self.config["DEFAULT"]["Precision"]
                / 5
            )
            bias = [int(x) for x in bias]

            thxHash = self.Deployed_FLcontract.functions.initModel(
                weights, bias
            ).transact({"from": self.web3Connection.eth.accounts[accountNR]})
            self.__await_Trainsaction(thxHash)

            thxHash = self.Deployed_FLcontract.functions.map_temp_to_global().transact(
                {"from": self.web3Connection.eth.accounts[accountNR]}
            )
            self.__await_Trainsaction(thxHash)

            thxHash = self.Deployed_FLcontract.functions.updateVerifier(
                self.config["DEFAULT"]["VerifierContractAddress"]
            ).transact({"from": self.web3Connection.eth.accounts[0]})
            self.__await_Trainsaction(thxHash)

    def __check_ZKP(self, proof, accountNR):
        a = proof["proof"]["a"]
        a = [Web3.toInt(hexstr=x) for x in a]

        b = proof["proof"]["b"]
        b = [[Web3.toInt(hexstr=x) for x in y] for y in b]

        c = proof["proof"]["c"]
        c = [Web3.toInt(hexstr=x) for x in c]

        inputs = proof["inputs"]
        inputs = [Web3.toInt(hexstr=x) for x in inputs]

        return a, b, c, inputs

    def __await_Trainsaction(self, thxHash):
        self.web3Connection.eth.wait_for_transaction_receipt(thxHash)

    def is_connected(self):
        return self.web3Connection.isConnected()

    def get_LearningRate(self, accountNR):
        self.precision = self.__get_Precision(accountNR)
        lr = self.Deployed_FLcontract.functions.getLearningRate().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )
        return lr

    def __get_Precision(self, accountNR):
        return self.Deployed_FLcontract.functions.getPrecision().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

    def get_InputDimension(self, accountNR):
        return self.Deployed_FLcontract.functions.getInputDimension().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

    def get_Epochs(self, accountNR):
        return self.config["DEFAULT"]["Epochs"]

    def get_OutputDimension(self, accountNR):
        return self.Deployed_FLcontract.functions.getOutputDimension().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

    def get_globalWeights(self, accountNR):
        we = self.Deployed_FLcontract.functions.get_global_weights().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )
        return we

    def get_globalBias(self, accountNR):
        bias = self.Deployed_FLcontract.functions.get_global_bias().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )
        return bias

    def get_account_balance(self, accountNR):
        return self.web3Connection.fromWei(
            self.web3Connection.eth.getBalance(
                self.web3Connection.eth.accounts[accountNR]
            ),
            "ether",
        )

    def roundUpdateOutstanding(self, accountNR):
        self.newRoundLock.acquire()
        newround = self.Deployed_FLcontract.functions.roundUpdateOutstanding().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

        if not newround:
            try:
                txhash = self.Deployed_FLcontract.functions.end_update_round().transact(
                    {"from": self.web3Connection.eth.accounts[accountNR]}
                )
                self.__await_Trainsaction(txhash)

            except Exception as intx:
                print(f"AccountNr = {accountNR}: Update Ending Reverted")
                print(f"AccountNr = {accountNR}: Trying end Again")

                try:
                    txhash = (
                        self.Deployed_FLcontract.functions.end_update_round().transact(
                            {"from": self.web3Connection.eth.accounts[accountNR]}
                        )
                    )
                    self.__await_Trainsaction(txhash)

                except Exception as intx:
                    print(f"AccountNr = {accountNR}: Update Ending Reverted")
                    print(intx)

        newround_refreshed = (
            self.Deployed_FLcontract.functions.roundUpdateOutstanding().call(
                {"from": self.web3Connection.eth.accounts[accountNR]}
            )
        )

        if newround_refreshed and (not newround):
            print(f"AccountNr = {accountNR}: Round is finished starting new round =>")
            self.newRoundLock.release()
            return newround_refreshed
        else:
            self.newRoundLock.release()
            return newround

    def __update_with_proof(self, weights, bias, accountNR, proof):
        a, b, c, inputs = self.__check_ZKP(proof, accountNR)

        weights = [[int(x) for x in y] for y in weights]
        bias = [int(x) for x in bias]

        thxHash = self.Deployed_FLcontract.functions.update_with_proof(
            weights, bias, a, b, c, inputs
        ).transact({"from": self.web3Connection.eth.accounts[accountNR]})

        self.__await_Trainsaction(thxHash)
        print(f"AccountNr = {accountNR}: UPDATE SUCCESSFUL")

    def __update_without_proof(self, weights, bias, accountNR):
        weights = [[int(x) for x in y] for y in weights]
        bias = [int(x) for x in bias]

        thxHash = self.Deployed_FLcontract.functions.update_without_proof(
            weights, bias
        ).transact({"from": self.web3Connection.eth.accounts[accountNR]})

        self.__await_Trainsaction(thxHash)
        print(f"AccountNr = {accountNR}: UPDATE SUCCESSFUL")

    def update(self, weights, bias, accountNR, proof=None):
        if self.config["DEFAULT"]["PerformProof"]:
            tries = 5
            while tries > 0:
                try:
                    self.__update_with_proof(weights, bias, accountNR, proof)
                    tries = -1
                except:
                    time.sleep(self.config["DEFAULT"]["WaitingTime"])
                    if tries == 1:
                        print(f"AccountNr = {accountNR}: Update Failed")
                    tries -= 1

        else:
            tries = 5
            while tries > 0:
                try:
                    self.__update_without_proof(weights, bias, accountNR)
                    tries = -1
                except:
                    time.sleep(self.config["DEFAULT"]["WaitingTime"])
                    if tries == 1:
                        print(f"AccountNr = {accountNR}: Update Failed")
                    tries -= 1

    def get_BatchSize(self, accountNR):
        return self.Deployed_FLcontract.functions.getBatchSize().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

    def get_RoundNumber(self, accountNR):
        return self.Deployed_FLcontract.functions.getRoundNumber().call(
            {"from": self.web3Connection.eth.accounts[accountNR]}
        )

    def get_Precision(self, accountNR):
        self.precision = self.__get_Precision(accountNR)
        return self.precision
