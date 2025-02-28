# NextJS + .NET Core Full-Stack Application
A modern full-stack application built with Next.js frontend and .NET Core backend with PostgreSQL database.

## Project Structure

```
├── backend/              # .NET Core API
│   ├── Controllers/      # API Controllers
│   ├── Models/          # Data Models
│   ├── Migrations/      # Database Migrations
│   └── Dockerfile       # Container configuration
│
└── frontend/            # Next.js Application
    ├── src/            # Source code
    ├── public/         # Static files
    └── package.json    # Dependencies
```    
## Backend (.NET Core)
The backend is built with .NET Core 8.0 and includes:

- PostgreSQL database with Entity Framework Core
- REST API with Controllers
- Swagger UI for API documentation
- CORS configuration for Next.js frontend
- Docker support

Running the Backend:
```
cd backend
dotnet restore
dotnet run
```
The API will be available at <http://localhost:8080>

## Frontend (Next.js)
The frontend is built with:
```
cd frontend
npm install
npm run dev
```
- Next.js 14
- TypeScript
- Tailwind CSS
- Running the Frontend

Visit <http://localhost:3000> to see the application.

## Docker Support
The backend includes Docker configuration for containerization.

```
docker compose up --build

```
## Development Requirements
- .NET Core SDK 8.0
- Node.js 18+
- PostgreSQL
- Docker (optional)
For API documentation, visit /swagger when running the backend in development mode.