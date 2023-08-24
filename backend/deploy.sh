echo "Building and deploying..."
echo "Expect it to take arround 3 minutes..."
echo ""

docker compose up -f docker-compose.yaml -f docker-compose.prod.yaml -d --build
