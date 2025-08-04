#!/bin/bash

echo "🚀 Starting Melbourne Parking System Development Environment..."

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Start backend
echo "📡 Starting Backend API (port 5001)..."
cd backend
if check_port 5001; then
    echo "⚠️  Port 5001 is already in use. Backend might already be running."
else
    npm run dev &
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
fi
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🌐 Starting Frontend (port 3000/3001)..."
cd frontend
if check_port 3000; then
    echo "⚠️  Port 3000 is in use, will use next available port."
fi
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started with PID: $FRONTEND_PID"
cd ..

echo ""
echo "🎉 Development environment started!"
echo ""
echo "📱 Frontend: http://localhost:3000 (or 3001 if 3000 is busy)"
echo "🔧 Backend API: http://localhost:5001"
echo ""
echo "📊 API Endpoints:"
echo "   - Parking Spots: http://localhost:5001/api/parking-spots"
echo "   - Insights: http://localhost:5001/api/insights"
echo ""
echo "🛑 To stop all services, press Ctrl+C"
echo ""

# Wait for user to stop
wait 