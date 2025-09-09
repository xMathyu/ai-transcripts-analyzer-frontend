# Docker Setup for AI Transcripts Analyzer Frontend

This document explains how to run the AI Transcripts Analyzer Frontend using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Production Deployment

To run the application in production mode:

```bash
# Build and start the production container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at `http://localhost:3000`

## Development Mode

For development with hot reloading:

```bash
# Start development environment
docker-compose --profile development up --build frontend-dev

# Or run in detached mode
docker-compose --profile development up -d --build frontend-dev
```

## Docker Commands

### Build the production image
```bash
docker build -t ai-transcripts-frontend .
```

### Run the production container
```bash
docker run -p 3000:3000 ai-transcripts-frontend
```

### Build the development image
```bash
docker build -f Dockerfile.dev -t ai-transcripts-frontend-dev .
```

### Run the development container with volume mounting
```bash
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules ai-transcripts-frontend-dev
```

## Environment Variables

You can set environment variables by creating a `.env` file in the project root:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add your custom environment variables here
```

## Multi-stage Build

The production Dockerfile uses a multi-stage build process:

1. **deps**: Installs production dependencies
2. **builder**: Builds the Next.js application
3. **runner**: Creates the final lightweight production image

This approach minimizes the final image size and improves security by excluding development dependencies and build tools.

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can change it in the docker-compose.yml file:

```yaml
ports:
  - "3001:3000"  # Change 3001 to your preferred port
```

### Permission issues
If you encounter permission issues on Linux/Mac, make sure the Docker daemon is running and you have the necessary permissions:

```bash
sudo systemctl start docker
sudo usermod -aG docker $USER
```

### Build cache issues
To rebuild without cache:

```bash
docker-compose build --no-cache
```
