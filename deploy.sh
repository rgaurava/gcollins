#!/bin/bash

# G. Collins & Sons Platform - Deployment Script
# Usage: ./deploy.sh [command]
# Commands: build, up, down, logs, migrate, restart, clean

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default environment file
ENV_FILE=".env.production"

# Check if .env.production exists
check_env() {
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${YELLOW}Warning: $ENV_FILE not found. Using default values.${NC}"
        echo -e "${YELLOW}For production, copy .env.production.example to .env.production and update values.${NC}"
    fi
}

# Build the Docker images
build() {
    echo -e "${GREEN}Building Docker images...${NC}"
    docker-compose build --no-cache
    echo -e "${GREEN}Build complete!${NC}"
}

# Start all services
up() {
    check_env
    echo -e "${GREEN}Starting G. Collins Platform...${NC}"
    docker-compose up -d
    echo -e "${GREEN}Platform is starting on port 3040${NC}"
    echo -e "${GREEN}Access the application at: http://localhost:3040${NC}"
}

# Stop all services
down() {
    echo -e "${YELLOW}Stopping G. Collins Platform...${NC}"
    docker-compose down
    echo -e "${GREEN}Platform stopped.${NC}"
}

# View logs
logs() {
    docker-compose logs -f "$@"
}

# Run database migrations and seed
migrate() {
    echo -e "${GREEN}Running database migrations and seed...${NC}"
    docker-compose run --rm migrate
    echo -e "${GREEN}Migration complete!${NC}"
}

# Restart application only (without database)
restart() {
    echo -e "${YELLOW}Restarting application...${NC}"
    docker-compose restart app
    echo -e "${GREEN}Application restarted!${NC}"
}

# Clean up everything (including volumes)
clean() {
    echo -e "${RED}WARNING: This will delete all data including the database!${NC}"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v --rmi all
        echo -e "${GREEN}Cleanup complete!${NC}"
    else
        echo -e "${YELLOW}Cleanup cancelled.${NC}"
    fi
}

# Show status
status() {
    echo -e "${GREEN}G. Collins Platform Status:${NC}"
    docker-compose ps
}

# First time setup
setup() {
    echo -e "${GREEN}=== G. Collins & Sons Platform Setup ===${NC}"

    # Check for .env.production
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${YELLOW}Creating production environment file...${NC}"
        cp .env.production.example .env.production

        # Generate random passwords
        DB_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)
        AUTH_SECRET=$(openssl rand -base64 32)

        # Update .env.production with generated values
        sed -i.bak "s/your_secure_database_password_here/$DB_PASS/g" .env.production
        sed -i.bak "s/your_nextauth_secret_here/$AUTH_SECRET/g" .env.production
        rm -f .env.production.bak

        echo -e "${GREEN}Generated secure credentials in .env.production${NC}"
    fi

    echo -e "${GREEN}Building and starting services...${NC}"
    build
    up

    # Wait for database to be ready
    echo -e "${YELLOW}Waiting for database to be ready...${NC}"
    sleep 10

    # Run migrations
    migrate

    echo -e "${GREEN}=== Setup Complete! ===${NC}"
    echo -e "${GREEN}Application running at: http://localhost:3040${NC}"
    echo ""
    echo -e "${GREEN}Demo Login Credentials:${NC}"
    echo -e "  Admin: admin@gcollinsandsons.com / admin123"
    echo -e "  Manager: sarah.collins@gcollinsandsons.com / user123"
    echo -e "  Sales: thomas.williams@gcollinsandsons.com / user123"
}

# Show help
help() {
    echo "G. Collins & Sons Platform - Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup    - First time setup (generates configs, builds, and starts)"
    echo "  build    - Build Docker images"
    echo "  up       - Start all services"
    echo "  down     - Stop all services"
    echo "  restart  - Restart the application"
    echo "  migrate  - Run database migrations and seed"
    echo "  logs     - View container logs (use: ./deploy.sh logs app)"
    echo "  status   - Show service status"
    echo "  clean    - Remove all containers, images, and volumes"
    echo "  help     - Show this help message"
}

# Main command handler
case "${1:-help}" in
    build)   build ;;
    up)      up ;;
    down)    down ;;
    logs)    shift; logs "$@" ;;
    migrate) migrate ;;
    restart) restart ;;
    clean)   clean ;;
    status)  status ;;
    setup)   setup ;;
    help)    help ;;
    *)       echo -e "${RED}Unknown command: $1${NC}"; help; exit 1 ;;
esac
