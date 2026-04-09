# API Reference

## Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/{id}` - User profile with trips, decisions, appeals
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Soft delete user
- `GET /api/admin/users/role/{role}` - Users by role

- `GET /api/admin/appeals` - List appeals with filters
- `GET /api/admin/appeals/{id}` - Appeal detail with linked user/decision
- `GET /api/admin/appeals/user/{userId}` - Appeals for user
- `POST /api/admin/appeals` - Submit appeal
- `PUT /api/admin/appeals/{id}/status` - Update appeal status
- `PUT /api/admin/appeals/{id}/resolve` - Resolve appeal

- `GET /api/admin/audit` - List audit entries
- `GET /api/admin/audit/decision/{decisionId}` - Audit trail for decision
- `POST /api/admin/audit` - Create audit log entry
- `GET /api/admin/audit/export` - Export payload

- `GET /api/admin/fairness` - All fairness metrics
- `GET /api/admin/fairness/zone/{zone}` - Metrics by zone
- `GET /api/admin/fairness/type/{type}` - Metrics by type
- `POST /api/admin/fairness` - Create metric
- `GET /api/admin/fairness/summary` - Aggregate summary

Example response shape:
```json
{
  "total": 20,
  "flagged": 3,
  "warning": 5,
  "byType": [{ "type": "SurgeFrequency", "avg": 1.42 }],
  "byZone": [{ "zone": "Downtown", "count": 6 }]
}
```

## Rider
- `GET /api/rider/dashboard/{userId}` - Rider dashboard payload
- `GET /api/rider/decisions/{userId}` - Rider decisions
- `GET /api/rider/decisions/item/{decisionId}` - Rider decision detail
- `GET /api/rider/appeals/{userId}` - Rider appeals
- `POST /api/rider/appeals` - Submit rider appeal

Example response shape:
```json
{
  "user": { "userId": "r1", "name": "Emily", "role": "Rider" },
  "trips": [{ "tripId": "trip-1044", "status": "Pending" }],
  "latestDecision": { "decisionId": "dec-1001", "decisionType": "AccountFlag" },
  "trustScore": 82
}
```

## Driver
- `GET /api/driver/dashboard/{driverId}` - Driver dashboard payload
- `GET /api/driver/trips/{driverId}` - Driver-specific trip list
- `GET /api/driver/appeals/{driverId}` - Driver appeals
- `POST /api/driver/appeals` - Submit driver appeal

Example response shape:
```json
{
  "driver": { "userId": "d1", "name": "Alex", "role": "Driver" },
  "trips": [{ "tripId": "trip-1042", "driverEarnings": 20.0 }],
  "totalEarnings": 186.2,
  "fairnessScore": 88
}
```

## Restaurant
- `GET /api/restaurant/orders/{restaurantId}` - Restaurant order/decision feed
- `GET /api/restaurant/appeals/{restaurantId}` - Restaurant appeals
- `POST /api/restaurant/appeals` - Submit restaurant appeal

Example response shape:
```json
{
  "restaurant": { "userId": "p1", "name": "Noodle House", "role": "Restaurant" },
  "decisions": [{ "decisionId": "dec-1008", "decisionType": "DriverMatch" }]
}
```

## Shared
- `GET /api/decisions` - Decisions with filters (`type`, `status`, `startDate`, `endDate`)
- `GET /api/decisions/{id}` - Single decision with audit trail
- `GET /api/decisions/user/{userId}` - Decisions for user
- `POST /api/decisions` - Create decision
- `PUT /api/decisions/{id}/flag` - Toggle flag
- `PUT /api/decisions/{id}/overturn` - Overturn decision

- `GET /api/trips` - All trips
- `GET /api/trips/{id}` - Trip detail
- `GET /api/trips/user/{userId}` - Trips by user
- `GET /api/trips/driver/{driverId}` - Trips by driver
- `POST /api/trips` - Create trip
- `PUT /api/trips/{id}` - Update trip status

- `GET /api/users` - Compatibility alias to admin users list
- `GET /api/appeals` - Compatibility alias to admin appeals list
- `GET /api/audit` - Compatibility alias to admin audit list
- `GET /api/fairness` - Compatibility alias to admin fairness list

Example response shape:
```json
{
  "decision": {
    "decisionId": "dec-1002",
    "decisionType": "SurgePricing",
    "status": "Active"
  },
  "auditTrail": [
    { "logId": "log-1", "actionTaken": "Reviewed", "timestamp": "2026-04-08T10:00:00Z" }
  ]
}
```
