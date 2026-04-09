# Driver Guide

## What Drivers See
Drivers see earnings, trip operations data, fairness score indicators, missed-trip context, and appeal options.

## Driver Actions
- Review assigned/missed trips
- Open trip-level explanations
- Use Why Not Me context
- Submit and track appeals

## Frontend Areas
- `frontend/src/pages/DashboardPage.jsx` (Driver dashboard)
- `frontend/src/pages/ExplanationPage.jsx` (Trip explanation)
- `frontend/src/pages/AnalyticsPage.jsx` (Performance and fairness charts)
- `frontend/src/pages/AppealsPage.jsx` (Driver appeals)

## Backend Controllers
- `backend/Controllers/Driver/DriverDashboardController.cs`
- `backend/Controllers/Driver/DriverTripsController.cs`
- `backend/Controllers/Driver/DriverAppealsController.cs`
