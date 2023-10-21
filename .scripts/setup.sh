#!/bin/bash

# Function to check if a command is available
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check and install Python if not installed
if ! command_exists python3; then
    echo "Python is not installed. Installing Python..."
    if command_exists apt-get; then
        sudo apt-get update
        sudo apt-get install -y python3
        elif command_exists yum; then
        sudo yum install -y python3
    else
        echo "Unsupported package manager. Please install Python manually."
        exit 1
    fi
else
    echo "Python is already installed."
fi

# Check and install npm if not installed
if ! command_exists npm; then
    echo "npm is not installed. Installing npm..."
    if command_exists apt-get; then
        sudo apt-get update
        sudo apt-get install -y npm
        elif command_exists yum; then
        sudo yum install -y npm
    else
        echo "Unsupported package manager. Please install npm manually."
        exit 1
    fi
else
    echo "npm is already installed."
fi

# Install Python dependencies from requirements.txt
if [ -f "backend/requirements.txt" ]; then
    echo "Installing Python dependencies from requirements.txt..."
    pip install -r backend/requirements.txt
else
    echo "requirements.txt not found in the backend directory."
fi

# Install npm dependencies from package.json
if [ -f "backend/package.json" ]; then
    echo "Installing npm dependencies from package.json..."
    (cd backend && npm install)
else
    echo "package.json not found in the backend directory."
fi

echo "Setup complete."
