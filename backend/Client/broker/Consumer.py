import pika


class Consumer:
    def __init__(self):
        self.queue = None
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("localhost")
        )
        self.channel = self.connection.channel()

    def declareQueue(self, name):
        self.channel.queue_declare(queue=name)

    def consumeData(self, queueName, callbackFunction):
        self.channel.basic_consume(
            queue=queueName,
            on_message_callback=callbackFunction,
            auto_ack=True,
        )

    def start(self):
        self.channel.start_consuming()

    def closeConnection(self):
        self.connection.close()


def callback(ch, method, attributes, body):
    print(f"Received {body}")
