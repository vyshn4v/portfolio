# Change Request: CR-006

## Metadata
- **Title**: Upgrade Vite Dependency to Remediate High Severity Vulnerabilities
- **Date**: 2026-11-24
- **Status**: Implemented
- **File Location**: 
  - `package.json`
  - `package-lock.json`
  - `SECURITY_ISSUES.MD`

---

## Description
Updated the `vite` devDependency from `^8.2.0` (resolving `8.2.1`) to `^8.3.8` to remediate high-severity security advisories flagged during the security and modern web audit.

### Vulnerabilities Resolved
1. **`vite`**:
   - `GHSA-698v-4r3x-3vcv`: Windows `%` escaping omission in `launch-editor`.
   - `GHSA-r825-w8mm-5pxw`: Editor CLI flag misinterpretation.
   - `GHSA-587h-7wmj-h5pm`: `fs.existsSync()` bypass on Windows.
   - `GHSA-9jrq-w75r-8gcw`: Cross origin script execution via custom middleware.
   - `GHSA-rq7h-c2jc-7f22`: Unauthorized file access outside `server.fs.allow`.
   - `GHSA-vfpm-58rq-9qcg`: Memory exposure via `?vite-wasm-instance`.
2. **`source-map-js`**:
   - `GHSA-68fv-2mgg-jv7q`: Event-loop denial of service vulnerability.

### Verification
- `npm audit`: Reported **0 vulnerabilities**.
- `oxlint`: Reported **0 errors, 0 warnings**.
- `tsc -b && vite build`: Succeeded in **245ms**.
- Updated `/SECURITY_ISSUES.MD` status from Pending to Resolved.
