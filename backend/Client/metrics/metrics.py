import os
from Client.utils.utils import load_config


class Metrics:
    def __init__(self, deviceName, config_load):
        self.deviceName = deviceName
        self.config = config_load
        self.round_time = {"Round-Number": [], "Time-Taken": []}
        self.round_gas = {"Round-Number": [], "Gas-Costs": []}
        self.round_proof_time = {"Round-Number": [], "Time-Taken": []}
        self.round_train_time = {"Round-Number": [], "Time-Taken": []}
        self.round_update_blockchain_time = {
            "Round-Number": [], "Time-Taken": []}
        self.round_score = {"Round-Number": [], "Score": []}
        self.round_classification_report = {"Round-Number": []}

    def add_round_time(self, round, time):
        self.round_time["Round-Number"].append(round)
        self.round_time["Time-Taken"].append(time)

    def add_round_update_blockchain_time(self, round, time):
        self.round_update_blockchain_time["Round-Number"].append(round)
        self.round_update_blockchain_time["Time-Taken"].append(time)

    def add_round_gas(self, round, gas):
        self.round_gas["Round-Number"].append(round)
        self.round_gas["Gas-Costs"].append(gas)

    def add_round_proof_time(self, round, time):
        self.round_proof_time["Round-Number"].append(round)
        self.round_proof_time["Time-Taken"].append(time)

    def add_round_train_time(self, round, time):
        self.round_train_time["Round-Number"].append(round)
        self.round_train_time["Time-Taken"].append(time)

    def add_round_score(self, round, score):
        self.round_score["Round-Number"].append(round)
        self.round_score["Score"].append(score)

    def add_classification_report(self, round, report):
        self.round_classification_report["Round-Number"].append(round)
        targets = self.config["DEFAULT"]["ActivitiesEncoded"]
        for target in targets:
            if target not in self.round_classification_report.keys():
                self.round_classification_report[target] = report[str(target)][
                    "precision"
                ]
            else:
                self.round_classification_report[target].append(
                    report[str(target)]["precision"]
                )
