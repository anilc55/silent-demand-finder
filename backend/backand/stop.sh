#!/bin/bash
# Stop Silent Demand Finder

if [ -f "server.pid" ]; then
    PID=$(cat server.pid)
    echo "🛑 Stopping server with PID: $PID"
    kill $PID
    rm server.pid
    echo "✅ Server stopped"
else
    echo "❌ No running server found"
fi
