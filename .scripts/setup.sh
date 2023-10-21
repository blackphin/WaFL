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

# Check if curl is installed
if ! command_exists curl; then
  # Install curl based on the OS type
  if [[ "$(uname -s)" == "Linux" ]]; then
    # For most Linux distributions
    if command_exists apt-get; then
      sudo apt-get update
      sudo apt-get install curl -y
    elif command_exists yum; then
      sudo yum install curl -y
    elif command_exists zypper; then
      sudo zypper install curl -y
    else
      echo "Error: Unsupported Linux distribution. Please install curl manually."
      exit 1
    fi
  elif [[ "$(uname -s)" == "Darwin" ]]; then
    # For macOS using Homebrew
    if command_exists brew; then
      brew install curl
    else
      echo "Error: Homebrew is not installed. Please install curl manually."
      exit 1
    fi
  else
    echo "Error: Unsupported operating system. Please install curl manually."
    exit 1
  fi
fi

# Install Zokrates
curl -LSfs get.zokrat.es | sh

echo "Setup complete. Python, npm, and project requirements are installed."
