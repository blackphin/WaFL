import pika


class Publisher:
    def __init__(self):
        self.queue = None
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("localhost")
        )
        self.channel = self.connection.channel()

    def declareQueue(self, name):
        self.channel.queue_declare(queue=name)

    def publishData(self, queueName, data):
        self.channel.basic_publish(exchange="", routing_key=queueName, body=data)

    def closeConnection(self):
        self.connection.close()
