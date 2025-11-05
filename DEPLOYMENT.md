# Deployment Guide for Cosmetic Harena

This guide provides instructions for deploying the Cosmetic Harena application, which consists of a React frontend (client) and a Symfony backend (server). The application uses Docker for containerization where applicable.

## Project Structure

- `client/`: React application (frontend)
- `server/`: Symfony application (backend)
- `compose.yaml` and `compose.override.yaml`: Docker configuration for database and mailer

## Prerequisites

- Node.js (for client build)
- PHP 8.2+ (for server)
- Composer (for PHP dependencies)
- Docker and Docker Compose (for database and mailer)
- PostgreSQL (if not using Docker)

## Backend (Symfony) Deployment

### 1. Install PHP Dependencies

Navigate to the server directory and install Composer dependencies:

```bash
cd server
composer install --no-dev --optimize-autoloader
```

### 2. Environment Configuration

Copy the `.env` file and configure it for production:

```bash
cp .env .env.prod
```

Edit `.env.prod` with production values:
- Database URL
- Mailer DSN
- App secret
- etc.

### 3. Database Setup

Run migrations to set up the database:

```bash
php bin/console doctrine:migrations:migrate --no-interaction
```

Load fixtures if needed:

```bash
php bin/console doctrine:fixtures:load --no-interaction
```

### 4. Build Assets

Install Node.js dependencies and build assets:

```bash
npm install
npm run build
```

### 5. Clear Cache

Clear the Symfony cache:

```bash
php bin/console cache:clear --env=prod --no-debug
```

### 6. Set Permissions

Ensure proper permissions for var/ directory:

```bash
chmod -R 755 var/
```

## Frontend (React) Deployment

### 1. Install Dependencies

Navigate to the client directory and install npm dependencies:

```bash
cd client
npm install
```

### 2. Build for Production

Build the React application:

```bash
npm run build
```

This creates a `dist/` directory with static files.

### 3. Serve Static Files

The built files in `client/dist/` can be served by any web server (e.g., Nginx, Apache) or deployed to a CDN.

## Docker Deployment (Optional)

If using Docker for the entire stack:

### 1. Database and Mailer

Use Docker Compose for database and mailer:

```bash
docker-compose up -d
```

### 2. Full Stack with Docker

For a complete Docker setup, you might need additional Dockerfiles. Currently, only database and mailer are containerized.

## Production Server Setup

### Nginx Configuration Example

For serving the React app and proxying to Symfony:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve React app
    location / {
        root /path/to/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Symfony
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Proxy admin requests
    location /admin {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Symfony Production Server

Run Symfony with a production server (e.g., using FrankenPHP or Apache):

```bash
php bin/console cache:warmup --env=prod
```

For development, use:

```bash
symfony server:start --no-tls
```

## Environment Variables

Ensure the following environment variables are set in production:

- `APP_ENV=prod`
- `APP_SECRET` (generate a secure secret)
- `DATABASE_URL` (PostgreSQL connection string)
- `MAILER_DSN` (for email sending)

## Security Considerations

- Use HTTPS in production
- Change default database passwords
- Set secure APP_SECRET
- Configure CORS properly in `nelmio_cors.yaml`
- Use environment variables for sensitive data

## Monitoring and Maintenance

- Set up log rotation for `var/log/`
- Monitor database performance
- Regularly update dependencies
- Backup database regularly

## Troubleshooting

- Check Symfony logs: `var/log/prod.log`
- Verify database connection
- Ensure file permissions are correct
- Check Node.js and PHP versions

## Dependencies Summary

### Client (React) Dependencies

**Production Dependencies:**
- react: ^19.1.1
- react-dom: ^19.1.1
- react-router: ^7.9.2
- react-router-dom: ^7.9.2
- axios: ^1.12.2
- lucide-react: ^0.544.0
- react-icons: ^5.5.0
- react-slick: ^0.31.0
- slick-carousel: ^1.8.1
- @tailwindcss/vite: ^4.1.13

**Dev Dependencies:**
- @vitejs/plugin-react: ^5.0.2
- tailwindcss: ^4.1.13
- autoprefixer: ^10.4.21
- postcss: ^8.5.6
- eslint: ^9.35.0
- vite: ^7.1.6
- daisyui: ^5.1.13

### Server (Symfony) Dependencies

**PHP Dependencies:**
- php: >=8.2
- symfony/framework-bundle: 7.3.*
- doctrine/orm: ^3.5
- easycorp/easyadmin-bundle: ^4.25
- nelmio/cors-bundle: ^2.5
- stripe/stripe-php: ^18.0
- twig/twig: ^2.12|^3.0

**Dev Dependencies:**
- doctrine/doctrine-fixtures-bundle: ^4.1
- symfony/maker-bundle: ^1.0
- symfony/web-profiler-bundle: 7.3.*
- phpunit/phpunit: ^12.3

**Node.js Dependencies (for assets):**
- @symfony/webpack-encore: ^5.2.0
- @hotwired/stimulus: ^3.2.2
- webpack: ^5.74.0

### Docker Services

- PostgreSQL 16
- Mailpit (for email testing)
