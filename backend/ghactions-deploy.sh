cd /home/shared/llocsdebegur
git pull

cd /home/shared/llocsdebegur/backend/
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
