import numpy as np


"""Activations"""


def ReLU(z):
    return np.maximum(0, z)


def ReLU_derivative(z):
    return np.where(z <= 0, 0, 1)


def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))


def sigmoid_derivative(z):
    return sigmoid(z) * (1 - sigmoid(z))


"""Losses"""


def MSE(y, y_hat, precision=2):
    return np.round(np.mean((y - y_hat) ** 2), precision)


def MSE_P(y, y_hat):
    return 2 * (y_hat - y) / y.size


"""Networks"""


class Layer:
    def __init__(self, precision=10**4) -> None:
        self.inputs = None
        self.outputs = None
        self._precision = precision

    def forward(self, inputs):
        raise NotImplementedError

    def backward(self, inputs):
        raise NotImplementedError

    def setprecision(self, precision):
        self._precision = precision


class FullyConnected(Layer):
    def __init__(
        self,
        input_size,
        output_size,
        activation=ReLU,
        activation_derivative=ReLU_derivative,
        precision=10**4,
    ) -> None:
        super().__init__(precision)
        weights = np.random.randint(
            -self.precision,
            self.precision,
            size=(self.output_dimension, self.input_dimension),
        )
        bias = np.random.randint(
            -self.precision, self.precision, size=(self.output_dimension,)
        )
        self.inputSize = input_size
        self.outputSize = output_size
        self.activation = activation
        self.activation_derivative = activation_derivative

    def forward(self, inputs):
        self.inputs = inputs
        self.outputs = self.activation(np.dot(self.weights, inputs) + self.biases)
        return self.outputs

    def backward(self, error, lr):
        error = np.dot(self.weights.T, error) * self.activation_derivative(self.inputs)
        self.weights -= lr * np.dot(error, self.inputs.T)
        self.biases -= lr * error
        return error

    def setwights(self, weights):
        self.weights = np.array(weights)
        self.weights = self.weights.T

    def setbiases(self, biases):
        self.biases = np.array(biases).reshape(1, -1)

    def getweights(self):
        return self.weights.T

    def getbiases(self):
        return self.biases.T


class ANN:
    def __init__(self, input_dim, output_dim, precision=10**4) -> None:
        self.layers = []
        self.loss = None
        self.precision = precision
        self.input_dim = input_dim
        self.output_dim = output_dim

    def add_layer(self, layer):
        self.layers.append(layer)
        if isinstance(layer, FullyConnected):
            weights = np.random.randint(
                -self.precision,
                self.precision,
                size=(self.output_dimension, self.input_dimension),
            )
            bias = np.random.randint(
                -self.precision, self.precision, size=(self.output_dimension,)
            )
            layer.set_weights(weights)
            layer.set_bias(bias)
        self.layers.append(layer)
