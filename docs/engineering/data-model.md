# Data Model

This document describes the core data entities used across enerOS and their relationships.

---

## Key Entities

| Entity | Description |
|---|---|
| `Organization` | A tenant that owns one or more sites |
| `Site` | A physical location containing devices |
| `Device` | A connected hardware asset (meter, inverter, battery, etc.) |
| `Reading` | A single time-stamped telemetry measurement from a device |
| `Command` | An instruction dispatched to a device via the Control Layer |
| `Alert` | An event raised when a device or system breaches a threshold |
| `User` | A human operator or customer with access to one or more organizations |

---

## Relationships

- An **Organization** has many **Sites**.
- A **Site** has many **Devices**.
- A **Device** produces many **Readings** and receives many **Commands**.
- A **Device** may raise many **Alerts**.
- A **User** belongs to one or more **Organizations** with a role.

---

## TODO

- [ ] Define canonical field names and data types for each entity
- [ ] Document the time-series schema for `Reading` (tags vs. fields, granularity)
- [ ] Specify `Command` state machine and audit fields
- [ ] Add entity-relationship diagram
- [ ] Document multi-tenancy isolation guarantees
