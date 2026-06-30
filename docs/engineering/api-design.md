# API Design

This document outlines the API design principles and conventions for enerOS.

---

## Principles

- **RESTful** resource-oriented design for external integrations.
- **GraphQL** for flexible data querying in the Application Layer dashboard.
- **Versioned** — all public APIs are prefixed with `/v{n}/` to allow non-breaking evolution.
- **Authenticated** — every request must carry a valid bearer token or API key.
- **Consistent error responses** — errors follow a standard envelope (`code`, `message`, `details`).

---

## Base URL

```
https://api.eneros.io/v1/
```

---

## Core Resources (planned)

| Resource | Path | Methods |
|---|---|---|
| Organizations | `/v1/organizations` | GET, POST |
| Sites | `/v1/organizations/{orgId}/sites` | GET, POST, PATCH, DELETE |
| Devices | `/v1/sites/{siteId}/devices` | GET, POST, PATCH, DELETE |
| Readings | `/v1/devices/{deviceId}/readings` | GET |
| Commands | `/v1/devices/{deviceId}/commands` | GET, POST |
| Alerts | `/v1/alerts` | GET, PATCH |

---

## TODO

- [ ] Define request/response schemas with JSON Schema or OpenAPI 3.x
- [ ] Document pagination, filtering, and sorting conventions
- [ ] Specify rate-limiting and quota policies
- [ ] Define webhook contract for real-time event delivery
- [ ] Publish auto-generated API reference (Swagger UI / Redoc)
