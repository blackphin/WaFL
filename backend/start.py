import os
import sys
import threading
import time

from Client.middleware.BCClient import Connection
from Client.middleware.Middleware import MiddleWare
from Client.utils.utils import load_config

def startClient(deviceName,accountNr,blockchain_connection,config_file):
    middleware = MiddleWare(blockchain_connection=blockchain_connection,deviceName=deviceName, accountNR=accountNr,configFile=config_file)
    middleware.start_Middleware()


def start():
    config_file = load_config(os.path.join(os.path.dirname(__file__), "CONFIG.yaml"))
    blockchain_connection=Connection(config_file=config_file)
    blockchain_connection.connect()
    for i in range(config_file["DEFAULT"]["NumberOfParticipants"]):
        thread=threading.Thread(target= startClient,args=["Device_"+str(i+1),i,blockchain_connection,config_file])
        thread.start()
        time.sleep(1)

