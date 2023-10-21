# WaFL: Web3 accelerated Federated Learning
Pairing ML Waffles with the sweetness ofWeb3 Syrup

![WaFL]()


# Problem Statement & Proposed Solution
Federated Learning is an ML paradigm that solves the issue of training Global Models among several entities without distributing sensitive data from each participating entity. In a gist, it works by clients locally training their models on their data and only sharing their model weights with an aggregator that uses an aggregation algorithm (e.g. FedAvg).
More info [here](https://medium.com/encora-technology-practices/an-introduction-to-federated-learning-a3e9faf8ec4d)

### While this novel approach mitigates the privacy problem, it also has its caveats:
• It requires clients to trust the aggregator for proper aggregations of weights
• A malicious client can poison the model's performance.

We realized that this problem statement has a tailor-made solution in blockchain. So we built a seamless and secure framework for ML developers to Federate their models: WaFL!

### The solution is a two-part approach:
• The aggregator entity is defined as a smart contract to ensure trustless and reliable aggregation computing for all model updates from the clients.
• The local model training compute performed by the clients is converted to an off-chain zkSNARK. The on-chain aggregator module verifies the ZKP before using the client's model weights for aggregation.

We provide all the middleware for the client to connect and interact with the aggregator as well as handle all the data flow for them so that they can work on their forte, i.e. their local models.
We provide a few-step setup so that everyone can start working with WaFL on the go.

Along with our main product, we also provide a service for the users to graph their model metrics (e.g. accuracy and loss scores). By simply signing up on our website, the users can track their model progress and tweak their hyper-parameters.

# TL;DR:
We offer our Platform as a service (PaaS) for users to engage in a P2P Informal Credit Transaction with verified Lendor and Borrower accounts and give them back their right to negotiate.

# Prize Tracks We Applied For:
1. World ID
2. Infura
3. Polygon
4. Push Protocol

# Development Flow:
1. Account Creation:
    We used **World ID**
2. Smart Contracts:
    We used **Solidity and Polygon**
3. Balance and Transaction History:
    We used **Fast APIs, web3.py & EtherScan**
4. Chat & Notifications:
    We used **Push Protocol**
6. Deployment:
    We used **Infura & Polygon**

# Tech Stack We Used:
1. Python
2. FastAPl
3. JSX
4. React
5. Solidity
6. Smart Contracts
7. zkSNARKS
8. ZoKrates
9. RabbitMQ
10. Web3.py 

# Challenges We Ran Into:
- Structuring various components properly to follow the proper structural flow design.
- Converting Machine Learning Code to circuits for zkSNARKS.
- Seamless Integration of the Sponsor SDKs.
- Thorough testing required a lot of Gas Fees, which was troublesome as the Faucets were either deprecated or empty.
- Dataflow between the Backend Modules required several refactors to work seamlessly.
- Deploying Smart Contract on Testnet required a lot of pre-requisite setup to spin up our own Subnet and Node Network.
# Images of The Project:
![Screenshot (4)](https://user-images.githubusercontent.com/44195921/205472864-6020a998-efdd-42d7-8eb0-0cbccd21ed4c.png)

![0002](https://user-images.githubusercontent.com/44195921/205472961-011c1d24-3830-4cb5-8277-f9d89ff4f0c7.gif)
