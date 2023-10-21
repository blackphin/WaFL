#!/bin/bash

# Check if Python is installed
if ! command -v python &>/dev/null; then
    echo "Python is not installed. Installing Python..."
    # Install Python (adjust the package manager for your system)
    sudo apt-get update
    sudo apt-get install python3
fi

# Check if npm is installed
if ! command -v npm &>/dev/null; then
    echo "npm is not installed. Installing npm..."
    # Install npm (adjust the package manager for your system)
    sudo apt-get update
    sudo apt-get install npm
fi

# Create a virtual environment in the 'backend' folder
cd backend
if [ ! -d .venv ]; then
    python -m venv .venv
fi

# Activate the virtual environment
source .venv/bin/activate

# Install Python requirements
pip install -r requirements.txt

# Install npm requirements
npm install

# Deactivate the virtual environment
deactivate

echo "Setup complete. Python, npm, and project requirements are installed."
