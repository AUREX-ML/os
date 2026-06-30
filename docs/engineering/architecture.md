# Architecture

enerOS is organized into five distinct layers, each responsible for a well-defined concern. Together they form a vertically integrated energy operating system — from raw device data at the edge up to end-user applications.

---

## 1. Devices Layer

The Devices Layer is the physical foundation of enerOS. It encompasses all connected hardware: smart meters, inverters, batteries, EV chargers, sensors, and other edge devices.

**Responsibilities**
- Device registration and identity management
- Real-time telemetry ingestion (readings, state changes, alarms)
- Firmware and configuration management
- Protocol translation (OCPP, Modbus, SunSpec, MQTT, etc.)

**TODO**
- [ ] Define device onboarding flow and provisioning API
- [ ] Document supported protocols and their adapters
- [ ] Specify edge-gateway architecture and local buffering strategy

---

## 2. Data Layer

The Data Layer receives raw telemetry from the Devices Layer, validates it, normalises it into a canonical format, and stores it for downstream consumption.

**Responsibilities**
- Time-series ingestion pipeline (streaming and batch)
- Data validation, deduplication, and normalisation
- Short-term (hot) and long-term (cold) storage
- Data access APIs for internal services

**TODO**
- [ ] Define the canonical telemetry schema
- [ ] Document retention policies and tiered storage strategy
- [ ] Describe the streaming pipeline topology (brokers, consumers, dead-letter queues)

---

## 3. Intelligence Layer

The Intelligence Layer applies analytics, machine learning, and forecasting on top of the normalised data to generate insights, predictions, and optimisation signals.

**Responsibilities**
- Load forecasting and generation forecasting
- Anomaly detection and predictive maintenance
- Price and grid signal processing
- Optimisation model execution (dispatch, scheduling)

**TODO**
- [ ] Document model training, versioning, and deployment workflow
- [ ] Specify feature store and data pipeline for ML models
- [ ] Define SLAs for real-time inference latency

---

## 4. Control Layer

The Control Layer translates intelligence outputs into concrete commands sent back to devices, while enforcing safety rules, grid compliance constraints, and operator policies.

**Responsibilities**
- Command dispatch and acknowledgement tracking
- Safety and constraint enforcement (SOC limits, ramp rates, grid codes)
- Automated control loops (DERMS, VPP, demand response)
- Audit trail of all control actions

**TODO**
- [ ] Define command schema and state machine (pending → acknowledged → executed → failed)
- [ ] Document constraint engine rules and configuration
- [ ] Specify rollback and fail-safe behaviour

---

## 5. Application Layer

The Application Layer surfaces enerOS capabilities to end users and external systems through dashboards, APIs, and integrations.

**Responsibilities**
- Customer-facing web and mobile dashboards
- External REST / GraphQL APIs for partners and third-party integrations
- Reporting, billing, and settlement exports
- Notification and alerting delivery

**TODO**
- [ ] Define public API versioning and deprecation policy
- [ ] Document authentication and authorisation model (OAuth 2.0 / API keys)
- [ ] Specify white-label and multi-tenancy requirements
