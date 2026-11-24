# Security Issues & Vulnerabilities Log

## Overview
This file tracks identified security issues and package vulnerabilities in compliance with repository security instructions (`/docs/SECURITY_INSTRUCTION.md`).

---

## 1. Dependency Vulnerabilities (npm audit)

- **Date Identified**: 2026-11-24
- **Date Resolved**: 2026-11-24
- **Severity**: High
- **Status**: Resolved (`0 vulnerabilities` confirmed via `npm audit`)

### Packages Affected
1. **`vite`** (Updated from `8.2.1` &rarr; `8.3.8`)
   - **Advisories Resolved**:
     - [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv): Windows `%` escaping omission in `launch-editor`.
     - [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw): Editor CLI flag misinterpretation.
     - [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm): `fs.existsSync()` bypass on Windows.
     - [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw): Cross origin script execution via custom middleware.
     - [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22): Files served outside `server.fs.allow`.
     - [GHSA-vfpm-58rq-9qcg](https://github.com/advisories/GHSA-vfpm-58rq-9qcg): First 4 bytes exposed by `?vite-wasm-instance`.

2. **`source-map-js`** (Transitive dependency of Vite / CSS processors)
   - **Advisory Resolved**: [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q): Event loop denial of service via indexed source-map section offsets.

### Remediation
Bumped `vite` in `package.json` to `^8.3.8`, regenerated `package-lock.json`, and verified with `npm audit` which reported `found 0 vulnerabilities`.
