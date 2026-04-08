# Architecture Overview

- Frontend: Vanilla JavaScript SPA rendered inside `#app` using Bootstrap components.
- Backend: ASP.NET Core Web API serving REST endpoints.
- Database: SQLite file in `backend/api/database.db`, accessed through direct SQL queries.
- Communication: Frontend calls backend endpoints using `fetch` with async/await.
