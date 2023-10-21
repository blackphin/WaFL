# WaFL: Web3 accelerated Federated Learning
Pairing ML Waffles with the sweetness ofWeb3 Syrup

Project Link: [WaFL](http://wafl-551f6d.spheron.app)


![cover](https://github.com/blackphin/WaFL/assets/44195921/78c5fd64-8282-4f87-bc7b-5c5b0a4c0e35)

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
We offer a secure and scalable Federated Learning Framework levaraging both on-chain aggreagation as well as off-chain ZKP verification.


# User Development Flow:
1. Account Creation
2. Framework Setup
3. Local Model Training
4. zkSNARK Production
6. ZKP Verification
7. Model Weight Aggregation
8. Dashboard Analytics

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

# Watchme
https://www.loom.com/share/b5a6780e3bbd493b8b0c143bad56973e?sid=5ef59be3-3e7b-46d7-b725-61c88faa2f2d

# Images of The Project:
![IMG-20231021-WA0003](https://github.com/blackphin/WaFL/assets/44195921/e56c8c89-e8f8-4328-9501-57d2c425e68d)
![IMG-20231021-WA0004](https://github.com/blackphin/WaFL/assets/44195921/cb435758-f92c-4436-b562-e38c34d2083b)
![IMG-20231021-WA0005](https://github.com/blackphin/WaFL/assets/44195921/2e854d12-5741-4fb7-840a-edf7f5aa02b4)
![IMG-20231021-WA0007](https://github.com/blackphin/WaFL/assets/44195921/b4f8a0ea-98f8-426e-b636-81b8c29b26c8)
![WhatsApp Image 2023-10-21 at 10 14 48_df47f797](https://github.com/blackphin/WaFL/assets/44195921/d8fdd43f-b92f-4c82-9332-70515b26a9fd)
