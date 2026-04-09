# Setup Guide

## Prerequisites
- Node.js 18+
- .NET 8 SDK or newer
- VS Code or Cursor

## Clone
```bash
git clone <repo-url>
cd Rideshare-Accountability-Bridge
```

## Run Backend
```bash
cd backend
dotnet restore
dotnet run --urls http://localhost:5000
```
Backend API: `http://localhost:5000`

## Run Frontend
```bash
cd frontend
npm install
npm start
```
Frontend app: `http://localhost:5173`

## Run Both At The Same Time
Open two terminals:
1. Terminal A runs backend (`cd backend && dotnet run --urls http://localhost:5000`)
2. Terminal B runs frontend (`cd frontend && npm start`)

## SQLite Database Location
SQLite file is created in `backend/accountability_bridge.db`.

## Reset Database And Reseed
```bash
cd backend
rm accountability_bridge.db
dotnet ef database update
dotnet run --urls http://localhost:5000
```
The app startup seed process repopulates data if tables are empty.
