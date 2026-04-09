# Rideshare-Accountability-Bridge

The Accountability Bridge is a fairness and transparency portal for rideshare and delivery decisions, built to provide understandable explanations and real recourse without exposing proprietary algorithms. It gives riders, drivers, restaurant partners, and admins tailored views so trust, operations, and compliance can work in one system.

## Folder Map

```text
Rideshare-Accountability-Bridge/
├── frontend/
├── backend/
│   ├── Controllers/
│   │   ├── Admin/
│   │   ├── Rider/
│   │   ├── Driver/
│   │   ├── Restaurant/
│   │   ├── Shared/
│   │   └── _examples/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── Migrations/
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   └── appsettings.Development.json
├── docs/
├── PROJECT_GUIDELINES.md
└── README.md
```

## Who Works On What

| Team Member | Role Focus | Folders to Work In |
|-------------|------------|--------------------|
| Jaimee | Testing/BA | `docs/`, `frontend/src/pages`, `backend/Services` |
| Anna Lee | ERD/Data Model | `backend/Models`, `backend/Data`, `backend/Migrations` |
| Cassie | Clarity/Readability | `docs/`, `frontend/src/components`, `README.md` |

## Run Locally

### Backend API
```bash
cd backend
dotnet restore
dotnet run --urls http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

Both should run at the same time for full functionality.
