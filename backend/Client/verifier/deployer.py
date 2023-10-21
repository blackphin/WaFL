import os
import subprocess
import time
import numpy as np

from backend.Client.middleware.Networks import MSE_P


def matrix_transform(matrix):
    max_field = (
        21888242871839275222246405745257275088548364400416034343698204186575808495617
    )
    return np.where(matrix < 0, max_field + matrix, matrix), np.where(matrix > 0, 0, 1)


def args_parser(args):
    result = ""
    for arg in range(len(args)):
        entry = args[arg]
        if isinstance(entry, (list, np.ndarray)):
            for i in range(len(entry)):
                row_i = entry[i]
                if isinstance(row_i, (list, np.ndarray)):
                    for j in range(len(row_i)):
                        val = row_i[j]
                        result += str(val) + " "
                else:
                    result += str(row_i) + " "
        else:
            result += str(args[arg]) + " "

    return result[:-1]


zokrates = "zokrates"
batchsize = 10


t1 = time.time()
path = os.path.dirname(os.path.abspath(__file__))
zokrates_compile = [
    zokrates,
    "compile",
    "-i",
    path + "/root.zok",
    "--allow-unconstrained-variables",
]
g = subprocess.run(zokrates_compile, capture_output=True)
t2 = time.time()
print(f"Compilation for {batchsize} samples took {t2 - t1} seconds")


zokrates_setup = [zokrates, "setup"]
t1 = time.time()
g = subprocess.run(zokrates_setup, capture_output=True)
t2 = time.time()
print(f"Setup for {batchsize} samples took {t2 - t1} seconds")


np.random.seed(0)
precision = 1000
od = 6
id = 9

bias = (
    np.random.randn(
        od,
    )
    * precision
)
bias = np.array([int(x) for x in bias])
b = bias
bias, bias_sign = matrix_transform(bias)

weights = np.random.randn(od, id) * precision
weights = np.array([[int(x) for x in y] for y in weights])
w = weights
weights, weights_sign = matrix_transform(weights)

x_train = np.random.randn(batchsize, id) * precision
x_train = np.array([[int(x) for x in y] for y in x_train])
X = x_train
x_train, x_train_sign = matrix_transform(x_train)

learning_rate = 10
Y = []
out = None

for x in X:
    randint = np.random.randint(1, od)
    y_true = np.zeros(shape=(od,))
    y_true[randint - 1] = precision
    Y.append(y_true)
    final_layer = (np.dot(w, X) / precision).astype(int)
    final_layer = np.add(final_layer, b)
    error = MSE_P(y_true, final_layer).astype(int)
    w = w - (np.outer(error, X) / precision / learning_rate).astype(int)
    b = b - (error / learning_rate).astype(int)

out = final_layer
args = [
    weights,
    weights_sign,
    bias,
    bias_sign,
    x_train,
    x_train_sign,
    Y,
    learning_rate,
    precision,
    matrix_transform(w)[0],
    matrix_transform(b)[0],
]

zokrates_compute_witness = [zokrates, "compute-witness", "-a"]
zokrates_compute_witness.extend(args_parser(args).split(" "))
t1 = time.time()
g = subprocess.run(zokrates_compute_witness, capture_output=True)
t2 = time.time()
print(f"Computing witness for {batchsize} samples took {t2 - t1} seconds")


zokrates_generate_proof = [zokrates, "generate-proof"]
t1 = time.time()
g = subprocess.run(zokrates_generate_proof, capture_output=True)
t2 = time.time()
print(f"Generating proof for {batchsize} samples took {t2 - t1} seconds")


zokrates_export_verifier = [zokrates, "export-verifier"]
t1 = time.time()
g = subprocess.run(zokrates_export_verifier, capture_output=True)
t2 = time.time()
print(f"Exporting verifier for {batchsize} samples took {t2 - t1} seconds")
