# G. Collins & Sons - Smart Platform

A comprehensive CRM, Inventory, Supply Chain & E-Commerce platform for G. Collins & Sons, an authorized Patek Philippe retailer and luxury jewelry store.

## Quick Start (Docker)

### Prerequisites
- Docker and Docker Compose installed
- Git

### 1. Clone and Setup

```bash
git clone https://github.com/rgaurava/gcollins.git
cd gcollins
cp .env.example .env
```

### 2. Start the Application

```bash
docker-compose up -d
```

### 3. Run Database Migrations & Seed

```bash
docker-compose run --rm migrate
```

### 4. Access the Application

Open your browser to: **http://localhost:3040**

That's it! The platform is ready to use.

---

## Features

### Dashboard
- Overview metrics and KPIs
- Quick access to all modules

### Analytics
- Revenue trends and charts
- Sales performance metrics
- Customer insights

### Customers (CRM)
- Customer profiles with VIP levels
- Contact management
- Lifetime value tracking
- Mailing lists with household grouping (Christmas cards feature)

### Inventory
- **Products**: Fine jewelry catalog with GIA certifications
- **Watches**: Patek Philippe collection management
- Real product images from gcollinsandsons.com

### Orders
- Order management and fulfillment
- Multiple order types (Standard, Bespoke, Repair, Consignment)
- Multi-channel support (In-Store, Online, Phone)

### Vendors & Supply Chain
- Vendor relationship management
- Purchase order tracking
- Delivery and payment status

### Appointments
- Customer appointment scheduling
- Multiple appointment types
- Staff assignment

### Repairs
- Workshop repair management
- Status tracking
- Cost estimation

---

## Architecture

- **Frontend**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM v7
- **Authentication**: NextAuth.js
- **Containerization**: Docker with multi-stage builds

## Docker Services

| Service | Port | Description |
|---------|------|-------------|
| app | 3040 | Next.js application |
| db | 5432 (internal) | PostgreSQL database |
| migrate | - | One-time migration runner |

## Production Deployment (AWS EC2)

### 1. Setup EC2 Instance
- Launch Ubuntu/Amazon Linux instance
- Install Docker and Docker Compose
- Open port 3040 (or use nginx reverse proxy on 80/443)

### 2. Clone and Configure
```bash
git clone https://github.com/rgaurava/gcollins.git
cd gcollins
cp .env.example .env
# Edit .env with production values
nano .env
```

### 3. Update Environment Variables
```bash
# Generate a secure secret
openssl rand -base64 32
# Update NEXTAUTH_SECRET in .env
# Update NEXTAUTH_URL to your domain
```

### 4. Start Services
```bash
docker-compose up -d
docker-compose run --rm migrate
```

### 5. Configure Load Balancer
Point your load balancer or reverse proxy to port 3040.

Example nginx configuration is provided in `nginx.conf.example`.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | (see .env.example) |
| DB_PASSWORD | Database password | gcollins_secure_2024 |
| NEXTAUTH_URL | Application URL | http://localhost:3040 |
| NEXTAUTH_SECRET | JWT secret key | (generate for production) |

---

## Development

### Local Development (without Docker)

```bash
npm install
npm run dev
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database
npm run db:seed
```

---

## Health Check

The application exposes a health check endpoint:

```
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-10T12:00:00.000Z",
  "service": "G. Collins & Sons Platform",
  "version": "1.0.0"
}
```

---

## License

Proprietary - G. Collins & Sons

Built by Justransform
