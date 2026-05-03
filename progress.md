# Progress — DNSMesh Brand Site

## Session 1 — 2026-05-03

### Done

- Created `~/code/DNSMesh/landing/` with `index.html` + `styles.css`. (Initial path mistake corrected: first written to `DNSMeshProtocol/landing/`, then moved.)
- First landing draft: editorial layout with section-number scheme and three card-grid sections.
- User flagged AI slop. Full rewrite to long-form prose: one column, one h2, one full-bleed ASCII diagram, no card grids, no section numbers, no kitsch stamps, no manifesto list. `?v=2` cache-bust on stylesheet.
- Ran `$impeccable teach`:
  - User answers captured (brand-only register, technical audience, anti-refs = no gradients / no textures, mental anchor = "federated email over DNS").
  - Wrote `PRODUCT.md` with 5 strategic principles, brand personality, anti-references, WCAG AA floor.
  - Reloaded context via `load-context.mjs`.
- User shared `https://dnsmesh.io/` for context. Confirmed it is a separate node-operator status page, not the brand site. To stay austere; brand site coexists as the marketing layer.
- Created planning files (`task_plan.md`, `findings.md`, `progress.md`) at project root.

### Pending decisions (waiting on user)

1. Hosting domain for the brand site (new domain / replace root / subroute).
2. Whether to run `$impeccable document` to seed `DESIGN.md` from current CSS.
3. Build/deploy target.

### Files created or modified this session

- `~/code/DNSMesh/landing/index.html` (rewritten)
- `~/code/DNSMesh/landing/styles.css` (rewritten)
- `~/code/DNSMesh/PRODUCT.md` (new)
- `~/code/DNSMesh/task_plan.md` (new)
- `~/code/DNSMesh/findings.md` (new)
- `~/code/DNSMesh/progress.md` (new)

### Errors encountered

| Error | Attempt | Resolution |
|---|---|---|
| `landing/` initially created in wrong project (`DNSMeshProtocol/`) | 1 | `mv` files to `DNSMesh/landing/`, removed empty source folder |
| First landing draft contained multiple AI-slop patterns (identical card grids, formulaic h2 template, kitsch stamp) | 1 | Full rewrite to long-form prose with one diagram and one h2 |

## Session 2 — 2026-05-03 (afternoon)

### Done

- Brainstormed creative direction with the visual companion. Sequence of decisions:
  1. Direction: **Switchboard** (bold display + diagrams as the brand).
  2. First palette attempt (Riso / Mineral / Acid Instrument): all rejected as too "novel", not stable enough.
  3. Stability palettes (Civic Green / Archival Walnut / Marine): user picked **Civic Green**.
  4. Typography: **C — Space Grotesk display + Newsreader body + JetBrains Mono technical**.
  5. Pivot: dark-only theme, register *reliable + sofisticado + privado*.
  6. Final palette: **Midnight Archive** — iron-gall ink `#0a0d18`, cool cream text, patinated brass `#a89066` signal.
- Wrote spec `docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md` and plan `docs/superpowers/plans/2026-05-03-landing-dark-redesign.md`.
- Initialized git on `main` (project was not previously a repo) and committed baseline.
- Executed plan via subagent-driven development across 12 tasks. Commits `388394d` → `2a3e566`.
- A11y pass: programmatically computed WCAG ratios per token pair. Brightened `--ink-4` from `#4d5670` to `#7a8398` so diagram italics and terminal comments hit AA on every background.
- Updated planning files; closed Phase 4 + Phase 5.

### Pending decisions (waiting on user)

1. Hosting domain (still open from Session 1).
2. Build/deploy target (Phase 6 blocker).
3. Real federation node count to replace `N` placeholder in hero ledger.

### Files created or modified this session

- `landing/index.html` (full rewrite — dark)
- `landing/styles.css` (full rewrite — Midnight Archive tokens + components + responsive + a11y fix)
- `docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md`
- `docs/superpowers/plans/2026-05-03-landing-dark-redesign.md`
- `task_plan.md`, `progress.md` (this entry)
- `.gitignore` (new)

## Session 3 — 2026-05-03 (planning resume)

### Done

- User invoked `planning-with-files` skill to resume planning workflow.
- Confirmed planning files stay in **English (primary)**; planning is not a separate i18n surface.
- New product constraint captured: **site must ship i18n with EN (canonical) + ES (faithful translation)**, more languages possible later.
- Added Phase 6.5 (i18n) to `task_plan.md`.
- Documented three i18n strategy options in `findings.md` with a recommendation (dual static files: `/` EN + `/es/` ES) and three sub-questions (URL shape, default detection, switch placement, ES translator role).

### Pending decisions (waiting on user)

1. Hosting domain (still open from Session 1).
2. Build/deploy target (still open from Session 1).
3. Real federation node count for hero ledger (still open from Session 2).
4. **i18n strategy** — confirm dual-static-files recommendation or pick alternative.
5. **Language switch placement** — header vs. footer (rec: footer).
6. **ES translation authorship** — user writes ES, or Claude drafts + user reviews?

### Files created or modified this session

- `task_plan.md` (added Phase 6.5, updated Constraints + Current Status)
- `findings.md` (added i18n strategy options + extended open questions)
- `progress.md` (this entry)

### Project relocation

- Moved project from `/Users/daniel/code/DNSMesh/` → `/Users/daniel/code/AINVIRION/DNSMesh/` to consolidate under the AINVIRION umbrella. Git repo, planning files, and `landing/` preserved intact. All future paths reference the new location.

### Pivot: Eleventy 3.x for i18n + structure

- User chose to convert the static landing into an **Eleventy 3.x** project. Build chain is now in scope; the bundled `I18nPlugin` is the i18n vehicle.
- Verified via context7 (`/11ty/11ty-website`) that Eleventy 3 stable (released Oct 2024) is the current line as of 2026-05; ESM-friendly, Node 18+, `I18nPlugin` is bundled and provides `locale_links`/`locale_url` filters.
- Updated `task_plan.md` Phase 6.5 with Eleventy migration tasks and updated `findings.md` with the canonical setup pattern and proposed project tree.

### Eleventy + WebC migration executed

User confirmed: URL shape `/en/` + `/es/` (root redirects), template **WebC**, header = AInvirion island navbar, ES drafted by Claude / reviewed by user.

- Installed `@11ty/eleventy@^3` (resolved to 3.1.5) + `@11ty/eleventy-plugin-webc@^0.11.2`.
- Created project skeleton: `package.json` (ESM), `eleventy.config.js`, `.gitignore` (added `_site/`).
- Data files: `src/_data/site.json` (canonical brand info), `src/_data/i18n/{en,es}.json` (full string bags), `src/{en,es}/{en,es}.11tydata.js` (sets `lang` per directory).
- Layout `src/_includes/base.webc` — monolithic (navbar + main slot + footer inline) because WebC components in `_components/` did not inherit page data scope. Three WebC quirks logged in `task_plan.md` for future work.
- Page templates `src/{en,es}/index.webc` (identical content; `lang` from directory data drives `i18n[lang]` lookups). Diagram and terminal blocks kept English (technical content per AInvirion i18n.md convention); only italic subtitles translated.
- CSS migrated from `landing/styles.css` to `src/styles.css` with AInvirion semantic tokens (`--bg`, `--surface`, `--text`, `--accent`, `--border`, `--border-strong`, etc.) aliased over Midnight Archive (`--ink-*`, `--bg-*`, `--signal*`). Wide-screen tier system added (`--max-width` scales at 1440 / 1920 / 2560). Full island-navbar styles + two-tier footer styles + responsive sweep.
- Navbar JS at `src/assets/js/navbar.js` — scroll-morph cache pattern from `~/code/AINVIRION/ainvirion_com/assets/js/app.js` with re-measurement after `document.fonts.ready` (per i18n width-cache caveat in `wide-screen-tiers.md`). Hamburger menu with focus-trap-ish click-outside and Escape-to-close.
- Root `/` is a `src/index.njk` with `<meta http-equiv="refresh">` to `/en/` plus JS `navigator.language` detection.
- Smoke test: `npm run build` produces 3 HTML files + passthrough assets. Dev server returns 200 on `/`, `/en/`, `/es/`, `/styles.css`, `/assets/js/navbar.js`. EN page 12.7KB, ES 13.1KB.
- `landing/` legacy directory still in place pending user's browser verification of parity.

### Pending decisions (waiting on user)

1. Hosting domain (open since Session 1).
2. Build/deploy target (Phase 6) — `_site/` is the artifact; any static host works.
3. Real federation node count for hero ledger (open since Session 2).
4. Browser parity verification on `/en/` and `/es/` before deleting legacy `landing/`.
5. Spanish translation review pass.

## Session 4 — 2026-05-03 (verificación + decisiones de despliegue)

### Done

- Browser sweep EN+ES con Playwright a 1280, 768, 375. Paridad de contenido confirmada. Navbar scroll-morph dispara `body.scrolled-past-hero` correctamente. Lang switcher renderiza pills EN/Español dentro del mobile menu como diseñado.
- **Bug detectado:** `.island-menu` (`src/styles.css:461`) sin `z-index` — al abrir el hamburger en 375px el panel queda por debajo del hero, el texto se filtra encima y los links quedan ilegibles. Stacking context del padre `.navbar-island` (z-index:100) no es suficiente.
- Favicon falta (404 en consola).
- Decisiones lockeadas en sesión:
  - **Diagrama → morph** del sistema AInvirion Product Theater (skill `ainvirion-morphs`). Reemplaza el ASCII actual y resuelve el overflow horizontal en 375.
  - **Deploy → GitHub Pages** como primera vitrina; resuelve Phase 2 + Phase 6 por ahora.
- Añadidas Phase 6.6 (morph) y Phase 6.7 (GitHub Pages) al `task_plan.md`.

### Files modified this session

- `task_plan.md` (Phase 6.5 cerrado parcial + bug logged; Phase 6.6 y 6.7 nuevas)
- `progress.md` (esta entrada)

### Done (parte 2 de la sesión: A → B → C ejecutado)

**A — Fix mobile menu + favicon:**
- `src/styles.css` — `.island-menu` recibió `z-index: 210` y bg cambiado de `var(--surface-90)` (alpha 0.9, hero filtraba) a `var(--surface-elevated)` sólido. Backdrop-filter eliminado del panel del dropdown.
- `src/favicon.svg` (placeholder: cuadrado patinated brass sobre iron-gall ink), passthrough en config, `<link rel="icon">` en `base.webc`. 200 OK, console error de favicon eliminado.

**B — Phase 6.6 morph del diagrama:**
- Skill `ainvirion-morphs` aplicada. Adopté Product Theater patterns sin tabs (DNSMesh es producto único). Prefix `dm-`, ciclo 9s, 3 fases × 3s.
- `src/_components/protocol-morph.webc` (componente WebC; `<webc:include>` literal NO funciona, vía oficial es `_components/` + `<component-name></component-name>`).
- ~150 líneas CSS al final de `src/styles.css`: stage 16:9 (4:5 mobile), grid de 3 columnas (sender/DNS/recipient), lane heads con accent dots, rails verticales gradient-faded, fade per-phase con keyframes diferenciados (`dm-arrow-1/2/3` con ventanas opacity alineadas a su fase), store badge pop con scale, pip timeline al pie cambiando de border-strong a accent.
- Reduced-motion fallback: muestra las 3 fases simultáneas con separadores dashed, stage colapsa a height auto.
- Validado en navegador 1280 + 375, EN+ES paridad. Bug encontrado y corregido durante iteración: el `dm-arrow-fade` global solo cubría window 0-28% — fases 2/3 quedaban invisibles. Resuelto con keyframes per-phase.

**C — Phase 6.7 GitHub Pages workflow:**
- `.github/workflows/deploy.yml` — checkout + setup-node@v4 + npm ci + configure-pages@v5 (extrae base_path) + build con `ELEVENTY_PATH_PREFIX` env + upload-pages-artifact@v3 + deploy-pages@v4. Permissions: `contents:read`, `pages:write`, `id-token:write`. Concurrency group `pages`.
- `eleventy.config.js` — lee `process.env.ELEVENTY_PATH_PREFIX` (default `/`), expone como global data `basePath` (siempre con trailing slash) y como `pathPrefix` en el return.
- Todos los paths absolutos refactorizados a `${basePath}…`: favicon, CSS, JS, lang switchers, brand links, hreflang alternates, brand mark links en footer. `src/index.njk` reescrito con `{{ basePath }}` en meta-refresh, canonical, alternates y JS de detección.
- Smoke local: `npm run build` (prefix `/`) y `ELEVENTY_PATH_PREFIX="/dnsmesh-site/" npm run build` generan paths esperados.

### Pending

1. Validación visual fina por parte del usuario en https://dantoac.github.io/dnsmesh/.
2. Migración del repo a `AInvirion/dnsmesh` cuando esté listo (cambia URL a `https://ainvirion.github.io/dnsmesh/` — workflow auto-ajusta pathPrefix).
3. Decisión de dominio público (`dnsmeshprotocol.org` u otro) — bloqueante para SEO/canonical.

### Deploy ejecutado

- `gh repo create dantoac/dnsmesh --public --source=. --remote=origin` → `https://github.com/dantoac/dnsmesh`
- 3 commits pusheados a `main`: migración Eleventy + i18n, deploy workflow, planning files.
- `gh api -X POST repos/dantoac/dnsmesh/pages -f build_type=workflow` para habilitar Pages con Actions source.
- Workflow run #25283489693 verde en 24s (build 14s, deploy 10s).
- Verificación HTTP: `/`, `/en/`, `/es/`, `/styles.css` → 200.
- Verificación browser: render correcto, console limpia, morph animando, navbar island OK, footer two-tier OK, pathPrefix `/dnsmesh/` aplicado en todos los assets.

**Sitio en vivo: https://dantoac.github.io/dnsmesh/**

### Files created/modified (parte 2)

- `src/styles.css` (z-index fix + ~150 líneas de morph CSS)
- `src/favicon.svg` (nuevo)
- `src/_components/protocol-morph.webc` (nuevo)
- `src/en/index.webc`, `src/es/index.webc` (reemplazo del `<pre class="protocol">` por `<protocol-morph></protocol-morph>`)
- `src/_includes/base.webc` (paths absolutos → `${basePath}…`, favicon link)
- `src/index.njk` (redirect con `{{ basePath }}`)
- `eleventy.config.js` (passthrough favicon, pathPrefix env, basePath global data)
- `.github/workflows/deploy.yml` (nuevo)

## Session 5 — 2026-05-03 (precisión técnica + cache-bust)

### Done

- Verificación contra `https://dnsmeshprotocol.org/how-it-works.html` (canonical):
  - Identidad (i): TXT firmados con Ed25519 + X25519 ✅ correcto.
  - **Mailbox slots (ii): IMPRECISIÓN encontrada y corregida.** El copy decía "Forward-secret prekeys advertised the same way" — eso conflataba mailbox slots con prekeys. En el protocolo real los prekeys viajan junto al registro de identidad (phase 1 del morph ya lo refleja con "pubkey + prekey"); los mailbox slots (`slot-N.mb-{hash(bob)}.<alice-zone>`) son **manifiestos por destinatario que el remitente escribe en su propia zona** y el receptor sondea. Reescrito en EN+ES.
  - Ciphertext chunks (iii): RFC 8945 TSIG + RFC 2136 DNS UPDATE ✅ correcto.
  - Strip "federation live since M9", warn pre-audit, comandos `dnsmesh init / tsig register / identity publish / refresh-prekeys / send / recv`, Argon2id derivation: todos verificados contra canonical.
  - Morph component sin cambios — ya era preciso (phase 1 entrega pubkey+prekey, phase 2 signed write con TSIG, phase 3 recipient fetch).
- Legacy `landing/`: ya no existe en disco ni en git (limpiado en sesión previa). Phase 6.5 task marcada como no-op completada.
- **Cache-bust dinámico:** `eleventy.config.js` añade `buildTime: String(Date.now())` como global data. `base.webc` reemplaza `?v=27` por `?v=${buildTime}` en CSS y JS. Build local genera `?v=1777823675945` (epoch ms), distinto en cada `npm run build`. CDN/proxy/browser invalidados automáticamente en cada deploy.
- ES translation: usuario confirmó que está OK, no requiere review pass.

### Files modified this session

- `src/_data/i18n/en.json` (diagram.ii body)
- `src/_data/i18n/es.json` (diagram.ii title + body)
- `eleventy.config.js` (`buildTime` global data)
- `src/_includes/base.webc` (`?v=${buildTime}` en CSS y JS)
- `task_plan.md`, `progress.md` (esta entrada)

### Pending

1. Validación visual fina por parte del usuario en https://dantoac.github.io/dnsmesh/ tras deploy.
2. Migración del repo a `AInvirion/dnsmesh`.
3. Decisión de dominio público.
4. Phase 7 (spec, getting-started, directory).

