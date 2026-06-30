# GitHub Issues

First-pass issue list for enerOS. Each item maps to a concrete unit of work with a suggested label, expected output, and acceptance criteria.

---

## Checklist

- [ ] Write enerOS MVP Scope
- [ ] Create OpenEMS-to-enerOS architecture mapping
- [ ] Organize repository structure
- [ ] Move website files into /website
- [ ] Add GitHub Pages deployment
- [ ] Define telemetry data model
- [ ] Build simulated telemetry generator
- [ ] Build dashboard prototype
- [ ] Create API endpoint plan
- [ ] Write setup guide

---

## Issue Details

### 1. Write enerOS MVP Scope

**Label:** `documentation`

**Expected output:** A `docs/product/mvp-scope.md` file that defines the boundaries of the minimum viable product — which features are in, which are deferred, and what success looks like at launch.

**Acceptance criteria:**
- Document lists in-scope features with a one-sentence description each
- Document lists explicitly out-of-scope items to prevent scope creep
- Success metrics (quantitative where possible) are defined for each in-scope feature
- Document is reviewed and merged into `main`

---

### 2. Create OpenEMS-to-enerOS Architecture Mapping

**Label:** `documentation`, `architecture`

**Expected output:** A `docs/engineering/openems-mapping.md` file that maps OpenEMS components (OSGi bundles, channels, controllers) to their enerOS equivalents or integration points.

**Acceptance criteria:**
- Every major OpenEMS bundle referenced in the project is listed
- Each entry states whether enerOS wraps, replaces, or delegates to the bundle
- Data-flow diagram or table shows how telemetry moves from OpenEMS into enerOS layers
- Document is reviewed and merged into `main`

---

### 3. Organize Repository Structure

**Label:** `chore`, `repository`

**Expected output:** A clean top-level directory layout with a `STRUCTURE.md` or updated `README.md` section that explains each directory's purpose.

**Acceptance criteria:**
- Top-level directories match the agreed-upon layout (`apps/`, `services/`, `data/`, `docs/`, `website/`)
- No orphaned files remain at the repository root (excluding standard config files)
- `README.md` includes a directory-structure section
- CI passes after reorganisation

---

### 4. Move Website Files into /website

**Label:** `chore`, `website`

**Expected output:** All static site assets (HTML, CSS, JS, images) reside under `website/` with no broken internal links.

**Acceptance criteria:**
- `website/index.html` and all related pages resolve correctly when served locally
- Internal links and asset paths (`css/styles.css`, `js/script.js`, `assets/images/`) are relative to `website/`
- No website files remain outside the `website/` directory
- CI or a link-checker step confirms no broken links

---

### 5. Add GitHub Pages Deployment

**Label:** `ci/cd`, `website`

**Expected output:** A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically publishes the `website/` directory to GitHub Pages on every push to `main`.

**Acceptance criteria:**
- Workflow triggers on push to `main`
- Workflow deploys only the contents of `website/`
- The live GitHub Pages URL loads the site without errors
- Workflow status badge is added to `README.md`

---

### 6. Define Telemetry Data Model

**Label:** `documentation`, `data`

**Expected output:** An updated or new `docs/engineering/data-model.md` that specifies the canonical telemetry schema — field names, types, units, and validation rules.

**Acceptance criteria:**
- Schema covers at minimum: device ID, timestamp, metric name, value, unit, and quality flag
- JSON Schema or equivalent machine-readable definition is included or linked
- Versioning strategy for schema evolution is described
- Document is reviewed and merged into `main`

---

### 7. Build Simulated Telemetry Generator

**Label:** `feature`, `data`, `simulation`

**Expected output:** A runnable script or service (e.g., `services/telemetry-sim/`) that emits synthetic device telemetry conforming to the defined data model.

**Acceptance criteria:**
- Generator emits at least one realistic device type (e.g., solar inverter, smart meter)
- Output format matches the canonical telemetry schema from issue #6
- Emission rate and number of simulated devices are configurable via CLI flags or environment variables
- README inside the service directory explains how to run it
- Unit tests cover at least the data-shaping logic

---

### 8. Build Dashboard Prototype

**Label:** `feature`, `frontend`

**Expected output:** A working prototype dashboard (under `apps/dashboard/` or `website/`) that visualises live or simulated telemetry data.

**Acceptance criteria:**
- Dashboard displays at least one real-time or near-real-time metric chart
- Data source is configurable (live API or simulated generator)
- Prototype is accessible at a local dev URL with a single `npm start` or equivalent command
- README documents how to run and configure the prototype

---

### 9. Create API Endpoint Plan

**Label:** `documentation`, `api`

**Expected output:** An updated `docs/engineering/api-design.md` that enumerates all planned REST endpoints for the enerOS MVP, including method, path, request/response shapes, and authentication requirements.

**Acceptance criteria:**
- All endpoints required by the MVP scope (issue #1) are listed
- Each endpoint entry includes: HTTP method, path, summary, request body schema (if applicable), response schema, and auth requirement
- Error response conventions are documented (status codes, error object shape)
- Document is reviewed and merged into `main`

---

### 10. Write Setup Guide

**Label:** `documentation`

**Expected output:** A `docs/engineering/setup.md` (or `CONTRIBUTING.md` section) that walks a new developer through cloning the repo, installing dependencies, and running the project locally end-to-end.

**Acceptance criteria:**
- Guide covers: prerequisites (Node version, Python version, etc.), clone and install steps, environment variable configuration, and how to start each service
- A developer following the guide from scratch can run the project without external help
- Guide is tested by at least one team member who was not its author
- Document is reviewed and merged into `main`
