# Task Plan — DNSMesh Brand Site

## Goal

Build the brand-only website for DNS Mesh Protocol (DMP). Lives separately from the existing node operator page at `dnsmesh.io`. Landing first; subsequent pages (spec, getting-started, deploy, directory) layered on the same design system.

## Mental Anchor

> DMP is federated email, except it runs on DNS instead of SMTP.

This sentence is the single mental model the site must install in every reader.

## Constraints (from PRODUCT.md)

- Register: **brand**
- Audience: technical primary, anyone secondary, no watering down
- Personality: encrypted / federated / social → candid, technical, calm
- **Hard anti-refs:** no gradients, no textured backgrounds
- Avoid: crypto/Web3, security-SaaS corporate, hacker-cosplay, chat-app marketing
- A11y: WCAG 2.1 AA, reduced-motion, color never as sole signal
- Status: protocol is pre-external-audit; honesty is the trust signal

## Phases

### Phase 1 — Context setup ✅ complete

- [x] Create `landing/` folder at `~/code/DNSMesh/`
- [x] Write `PRODUCT.md` (register, users, principles, anti-refs)
- [x] First landing draft (`landing/index.html` + `landing/styles.css`)
- [x] Slop pass: replaced card-grid editorial template with single-column long-form

### Phase 2 — Resolve hosting decision 🔵 in_progress

- [ ] User confirms where the brand site lives:
  - (a) new domain (e.g. `dnsmeshprotocol.org`)
  - (b) `dnsmesh.io/` replaces current node page (node moves elsewhere)
  - (c) subroute (`dnsmesh.io/about` etc.)
- [ ] Record decision in `findings.md` and update internal links accordingly

### Phase 3 — Capture design system

- [ ] Run `$impeccable document` against `landing/styles.css` to produce `DESIGN.md`
- [ ] Verify `DESIGN.md` accurately captures: OKLCH palette, Fraunces/Inter Tight/JetBrains Mono scale, codeblock + diagram + warn + dateline components
- [ ] Reload context via `load-context.mjs`

### Phase 4 — Iterate landing v2

- [ ] `$impeccable critique landing/index.html` — UX heuristic review
- [ ] Address any P0/P1 findings
- [ ] Confirm copy reinforces the federated-email anchor on first read

### Phase 5 — Quality gates

- [ ] `$impeccable audit landing/index.html` — a11y, perf, responsive
- [ ] Verify AA contrast on every text/background pair
- [ ] Verify reduced-motion suppresses any reveal/scroll animations
- [ ] Test on mobile viewport (≤560px)

### Phase 6 — Ship setup

- [ ] Decide hosting target (GitHub Pages, Cloudflare Pages, Caddy on a node?)
- [ ] Add minimal build/deploy story (or commit to "static, drop the folder")
- [ ] Cache-bust query strings (`?v=N`) confirmed on every linked asset

### Phase 7 — Adjacent surfaces (later)

- [ ] Spec page styling
- [ ] Getting-started walkthrough
- [ ] Live directory page (already exists at `ovalenzuela.com/DNSMeshProtocol/directory/` but could move into the brand site)

## Current Status

In Phase 2. Waiting on hosting decision before finalizing internal link targets and footer copy.

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| Created `landing/` in wrong project (`DNSMeshProtocol/` instead of `DNSMesh/`) | 1 | Moved files with `mv`, removed empty folder |
| Initial landing v1 contained AI slop (3 identical card grids, §01-§04 numbering, formulaic h2 pattern, kitsch "Pre-audit" stamp, manifesto-bait principles list) | 1 | Full rewrite to long-form prose with one diagram and one h2 |
