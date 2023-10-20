from typing import Any
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


"""Network"""


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
        self.weights = None
        self.biases = None
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

    def set_wights(self, weights):
        self.weights = np.array(weights)
        self.weights = self.weights.T

    def set_biases(self, biases):
        self.biases = np.array(biases).reshape(1, -1)

    def get_weights(self):
        return self.weights.T

    def get_biases(self):
        return self.biases.T

    def set_precision(self, precision):
        self.precision = precision


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

    def set_loss(self, loss, loss_p):
        self.loss = loss
        self.loss_p = loss_p

    def set_weights(self, weights):
        for layer in self.layers:
            if isinstance(layer, FullyConnected):
                layer.set_weights(weights)

    def set_biases(self, biases):
        for layer in self.layers:
            if isinstance(layer, FullyConnected):
                layer.set_biases(biases)

    def get_weights(self):
        for layer in self.layers:
            if isinstance(layer, FullyConnected):
                return layer.get_weights()

    def get_biases(self):
        for layer in self.layers:
            if isinstance(layer, FullyConnected):
                return layer.get_biases()

    def set_precision(self, precision):
        self.precision = precision
        for layer in self.layers:
            if isinstance(layer, FullyConnected):
                return layer.set_precision(precision)

    def predict(self, input_data):
        samples = len(input_data)
        input_data = input_data * self.precision
        input_data = input_data.astype(int)
        result = []

        for i in range(samples):
            output = input_data[i]
            for layer in self.layers:
                output = layer.forward(output)
            output = np.argmax(output) + 1
            result.append(output)
        return result

    def fit(self, x_train, y_train, epochs, learning_rate):
        samples = len(x_train)
        for i in range(epochs):
            err = 0
            for j in range(samples):
                output = x_train[j] * self.precision
                output = output.astype(int)
                y_true = np.zeros(self.output_dimension)
                y_true[y_train[j] - 1] = self.precision
                for layer in self.layers:
                    output = layer.forward_propagation(output)
                err += self.loss(y_true, output, precision=self.precision)
                error = self.loss_prime(y_true, output).astype(int)
                for layer in reversed(self.layers):
                    error = layer.backward_propagation(error, learning_rate)

            err /= samples
