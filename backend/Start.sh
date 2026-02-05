#!/bin/bash
# Silent Demand Finder - Auto Start Script

echo "🚀 Starting Silent Demand Finder..."

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip
fi

# Install requirements
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

# Create data directory
mkdir -p data
mkdir -p logs

# Start server
echo "🔧 Starting API Server..."
python3 server.py > logs/server.log 2>&1 &

# Get PID
SERVER_PID=$!
echo $SERVER_PID > server.pid

echo "✅ Server started with PID: $SERVER_PID"
echo "🌐 API URL: http://localhost:5000"
echo "👤 Admin Panel: http://localhost:5000/admin/login.html"
echo "📝 Logs: logs/server.log"

# Auto-restart on crash
while true; do
    if ! kill -0 $SERVER_PID 2>/dev/null; then
        echo "🔄 Server crashed. Restarting..."
        python3 server.py > logs/server.log 2>&1 &
        SERVER_PID=$!
        echo $SERVER_PID > server.pid
    fi
    sleep 10
done
