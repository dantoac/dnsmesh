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
- **Languages:** English is the primary language (canonical source). Site must ship i18n with at least **EN + ES**. English copy is authored first; Spanish is a faithful translation, not a separate voice.

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

- [x] Brainstormed direction (Switchboard), palette pivot (Midnight Archive dark) and typography (Space Grotesk + Newsreader + JetBrains Mono)
- [x] Wrote spec at `docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md`
- [x] Wrote plan at `docs/superpowers/plans/2026-05-03-landing-dark-redesign.md`
- [x] Implemented dark redesign via subagent-driven dev (commits `388394d` → `2a3e566`)
- [x] Confirmed copy reinforces the federated-email anchor (anchor section installs the mental model)

### Phase 5 — Quality gates

- [x] Verified AA contrast for every text/background pair against tokens (--ink-4 brightened to `#7a8398` to clear AA on all bg shades)
- [x] Reduced-motion media query suppresses smooth scroll
- [x] Mobile responsive at ≤720px (hero, anchor, three-up, footer all stack)
- [ ] Live browser sweep at desktop + 375px (deferred to user — requires opening `landing/index.html`)
- [ ] Hard-refresh check after final cache-bust

### Phase 6 — Ship setup

- [ ] Decide hosting target (GitHub Pages, Cloudflare Pages, Caddy on a node?)
- [ ] Add minimal build/deploy story (or commit to "static, drop the folder")
- [ ] Cache-bust query strings (`?v=N`) confirmed on every linked asset

### Phase 6.5 — Migrate to Eleventy + AInvirion shell + i18n (EN+ES) 🔵 next

**Decisions locked (2026-05-03 session 3):**
- Stack: **Eleventy 3.x**, ESM, Node 18+, template language **WebC** (pending final confirm), bundled `I18nPlugin` with `defaultLanguage: "en"`.
- URL shape: **`/en/` + `/es/`**, root `/` redirects to `/en/` (symmetric, scales to more languages).
- Header: **AInvirion island navbar** (full standard → island morph, sliding indicator, hamburger on mobile). Reference: `~/code/AINVIRION/ainvirion_com/`.
- Footer: AInvirion two-tier, brand-tagline + GitHub Issues support link + canonical copyright `© {year} AInvirion | Seattle, USA · Santiago, Chile` + phone `(425) 276-7365`.
- Lang switcher: `<a href>` in `.island-actions`, with `lang`/`hreflang` attributes (no JS swap; build-time per-language URLs).
- ES authorship: Claude drafts, user reviews.

**Tasks (in order):**

- [x] Scaffold: `package.json` (`"type": "module"`), `eleventy.config.js` (ESM), update `.gitignore` (`node_modules/`, `_site/`)
- [x] Configure WebC + `I18nPlugin` in `eleventy.config.js`; passthrough copy for CSS/JS/fonts
- [x] Create `src/_data/site.json` (canonical URL, year, AInvirion brand info), `src/_data/i18n/{en,es}.json` (full string bags: meta, nav, hero, anchor, diagram, prose, try, warn, footer)
- [x] Build `src/_includes/base.webc` layout — monolithic shell (navbar + main + footer inlined; WebC components dropped because page-data scope didn't propagate into `_components/` files)
- [x] Implement island navbar per `references/island-navbar.md` (4 zones, scroll morph via `body.scrolled-past-hero`, hamburger mobile, lang switcher in actions)
- [x] Implement two-tier footer per `references/footer-two-tier.md` (brand + nav + contact / copyright + license + legal links)
- [x] Token reconciliation: AInvirion semantic tokens (`--bg`, `--surface`, `--text`, `--accent`, etc.) added as aliases over Midnight Archive set (`--ink-*`, `--bg-*`, `--signal*`); no design rewrite
- [x] Port `landing/index.html` content into `src/en/index.webc` extending `base.webc` — content identical to v2 dark redesign
- [x] Author `src/es/index.webc` — faithful technical-register translation; same template, `lang` from `es/es.11tydata.js` drives `i18n[lang]` lookups
- [x] Root redirect `src/index.njk` — `<meta http-equiv="refresh">` + JS `navigator.language` detection + `<link rel="canonical" href="/en/">`
- [x] `npm run build` + `npm run dev` scripts wired
- [x] Smoke: build green (3 files), dev server returns 200 on `/`, `/en/`, `/es/`, `/styles.css`, `/assets/js/navbar.js`. EN 12.7KB, ES 13.1KB (3% longer — expected).
- [x] Live browser sweep on both languages — EN+ES paridad confirmada @ 1280, 768, 375. Navbar scroll-morph dispara correctamente (`body.scrolled-past-hero` activa la isla). Lang switcher EN/ES emite los pills correctos en mobile menu. **Bug encontrado:** `.island-menu` (`src/styles.css:461`) carece de `z-index` — el panel queda por debajo del hero al abrirse en 375px (texto del hero se filtra encima). Backdrop-filter blur no protege porque el stacking context es el de `.navbar-island` (z-index:100) pero al ser absolute dentro, el contenido scrolled puede quedar encima si tiene su propio contexto. Falta también `<link rel="icon">` (favicon 404).
- [x] **FIX:** `z-index: 210` añadido + cambio de `var(--surface-90)` (10% transparente, hero se filtraba) a `var(--surface-elevated)` sólido. Backdrop-filter eliminado del panel del dropdown — frosted glass se reserva para la barra del navbar. Verificado en 375 con CSS `?v=23`.
- [x] Favicon: `src/favicon.svg` (cuadrado patinated brass sobre iron-gall ink), passthrough en `eleventy.config.js`, `<link rel="icon">` en `base.webc`. 200 OK.
- [x] Delete legacy `landing/` (already absent on disk + git as of session 5; no-op confirmed)

### Phase 6.5 quirks logged for future work

- **WebC component data scoping:** page-level data (`lang`, `i18n`) does NOT propagate into components in `src/_components/**/*.webc` automatically. Workaround applied: monolithic `base.webc`. To split into components later, pass `lang` + `i18n` as attributes or use `<script webc:setup>`.
- **External URLs in `<link>`/`<script>`:** WebC tries to bundle by default; must use `webc:keep` to emit unchanged.
- **Layout content slotting:** `<slot></slot>` does not work for layout-wrapped pages in WebC; use `<main @html="content"></main>` instead.
- **Includes:** `<webc:include src="…">` no procesa el include — sale como tag textual al HTML final. Vía correcta: declarar componente en `_components/**/*.webc` (registrado en `pluginWebc({ components: … })`) y usar como `<component-name></component-name>`.

### Phase 6.6 — Diagram → Morph animation 🔵 next

User decision (2026-05-03 sesión 4): el diagrama ASCII actual debe convertirse a un **morph** del sistema Product Theater de AInvirion. Ver skill `ainvirion-morphs`.

- [x] Skill `ainvirion-morphs` invocada — patrón Product Theater + 8 patterns adoptados (multi-phase sequential, transform entry, glow). Theater wrapper omitido (DNSMesh es producto único, no rotación de tabs).
- [x] Diseño: 3 fases × 3s en ciclo de 9s. Phase 1 identity (query/cached/reply), Phase 2 signed write (UPDATE+TSIG/authenticated/store-badge), Phase 3 fetch (chunk/plain/ciphertext). Pip indicator timeline al pie.
- [x] Componente `src/_components/protocol-morph.webc` (componentes WebC sin scope de page-data, OK porque labels son código mono y no requieren i18n). Reemplaza `<pre class="protocol">` en EN+ES.
- [x] Bloque CSS `dm-` (~150 líneas) al final de `src/styles.css`: tokens DNSMesh (`--accent` patinated brass), grid de 3 columnas, lane heads, rails verticales, fade per-phase, store badge pop, pip timeline.
- [x] Reduced-motion fallback: muestra las 3 fases simultáneas, separadores dashed, pips todos en accent, stage colapsa a height auto.
- [x] Validado en navegador: 1280 (3 fases en ventanas correctas), 375 (mobile responsive con padding ajustado), EN y ES paridad. Overflow horizontal del ASCII original eliminado.
- [x] **Aprendizaje:** WebC `<webc:include src="…">` no procesa includes literales — vuelve a salir como tag textual. Vía oficial es declarar componente en `_components/` y usar `<component-name></component-name>`. Documentado.

### Phase 6.7 — GitHub Pages deploy 🔵 next

User decision (2026-05-03 sesión 4): primer deploy en **GitHub Pages** para mostrar el sitio. Esto resuelve Phase 2 (hosting) y Phase 6 (target) por ahora; dominio definitivo se decide después.

- [x] Repo creado: **`dantoac/dnsmesh`** (público, en cuenta personal del usuario; se moverá a `AInvirion/` tras validación). URL pública: https://dantoac.github.io/dnsmesh/.
- [x] Workflow `.github/workflows/deploy.yml` con `actions/configure-pages@v5` + `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`. Lee `base_path` de configure-pages y lo inyecta como env `ELEVENTY_PATH_PREFIX` al build.
- [x] `pathPrefix` configurable: `eleventy.config.js` lee `ELEVENTY_PATH_PREFIX` (default `/`) y lo expone como global data `basePath`. `pathPrefix` también pasado al return de Eleventy.
- [x] Todos los paths absolutos en `src/_includes/base.webc` (favicon, CSS, JS, lang switchers, brand links, hreflang, redirect) usan `${basePath}…` interpolation. `src/index.njk` reescrito para usar `{{ basePath }}` en redirect, canonical, alternates y JS.
- [x] Smoke test local: `npm run build` (prefix `/`) y `ELEVENTY_PATH_PREFIX="/dnsmesh-site/" npm run build` ambos generan paths consistentes (`/favicon.svg` vs `/dnsmesh-site/favicon.svg`, etc.).
- [x] GitHub Pages habilitado vía `gh api -X POST repos/dantoac/dnsmesh/pages -f build_type=workflow`.
- [x] Smoke test post-deploy: `/`, `/en/`, `/styles.css` → 200. Render visual correcto en https://dantoac.github.io/dnsmesh/en/, cero errores de consola, morph activo, navbar island, footer two-tier OK.
- [x] Cache-bust query strings: `buildTime` global data en `eleventy.config.js` (`String(Date.now())`), inyectado en CSS y JS via `?v=${buildTime}`. Cada build produce un timestamp único (~13 dígitos epoch ms).

### Phase 6.8 — Revisión sistemática contra dnsmeshprotocol.org 🔵 in_progress

User decision (2026-05-03 sesión 6): pasar la landing por una verificación palabra-a-palabra contra `dnsmeshprotocol.org` (fuente canónica) y asegurar que el morph refleje fielmente el protocolo descrito en `how-it-works.html`.

**Fixes ya aplicados en sesión 6 (parte 1):**
- [x] Morph Phase 1 query: `_dnsmesh-id.bob.dmp.io` → `id-a1b2c3d4.bob.dmp.io` (formato canónico `id-<sha256(subject)[:16]>.<zone>`; el prefijo `_dnsmesh-` está reservado para *claim records*, no identidad)
- [x] Morph Phase 3 chunk: `_dnsmesh-chunk-7f.…` → `chunk-1-7f.alice.dmp.io` (formato `chunk-N-M.<zone>` y bajo zona del **remitente** — la spec dice *"records live under the sender's zone, and the recipient walks senders' zones"*)
- [x] Morph Phase 3 dirección de flechas invertida (← TXT chunk, ← ciphertext): el receptor consulta la zona del remitente, no al revés
- [x] `.dm-store` movido de carril recipient (col 3) a sender (col 1) en `styles.css`: el chunk se almacena en el nodo autoritativo del remitente

**Discrepancias resueltas (sesión 6, parte 2 — usuario confirmó dnsmeshprotocol.org como fuente de verdad):**
- [x] **Versión:** `site.json` `0.5.x` → `0.2.0-beta`. Strip ahora renderiza `v0.2.0-beta · federation live since M9`.
- [x] **Endpoint terminal:** `https://dnsmesh.io` → `dnsmesh.io` (EN + ES).
- [x] **Domain placeholder:** `dmp.dnsmesh.io` → `<your-zone>` (EN + ES). Línea `dnsmesh send bob@dmp.dnsmesh.io` mantenida (es ejemplo de destinatario, no placeholder de zona propia).
- [x] **`site.json` enlaces:**
  - `spec` → `https://dnsmeshprotocol.org/protocol/spec.html` (canónica viva).
  - `directory` → `https://dnsmeshprotocol.org/directory/`.
  - `github` → confirmado `oscarvalenzuelab/DNSMeshProtocol` (canónica enlaza al mismo repo desde su nav).
  - `security` → ya apuntaba al canónico, sin cambios.

**Páginas canónicas mapeadas (para revisiones futuras):**
- `/how-it-works.html` — protocolo y cripto (verificada parcialmente)
- `/getting-started.html` — install + comandos
- `/guide/{cli,identity,forward-secrecy,registration}.html`
- `/protocol/{spec,wire-encoding,wire-format,crypto,routing,flows,security-model,threat-model,cluster,bootstrap,rotation,notifications}.html`
- `/deployment/*.html` (10 páginas)
- `/directory/`

**Tareas pendientes:**
- [x] Resolver las 4 discrepancias listadas
- [x] Build + smoke test post-fixes (3 archivos generados, `v0.2.0-beta` confirmado en HTML)
- [ ] Validación visual del morph corregido en navegador (1280 + 375)
- [ ] Commit + push a `dantoac/dnsmesh` para deploy de Pages

### Phase 7 — Adjacent surfaces (later)

- [ ] Spec page styling
- [ ] Getting-started walkthrough
- [ ] Live directory page (already exists at `ovalenzuela.com/DNSMeshProtocol/directory/` but could move into the brand site)

## Current Status

Phase 4 + 5 closed via dark redesign (Midnight Archive). New requirement: site must ship i18n EN+ES (English primary, Spanish faithful translation) — added as Phase 6.5. Phase 2 (hosting decision) and Phase 6 (ship setup) still pending; i18n strategy choice is a soft prerequisite for build/deploy decisions.

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| Created `landing/` in wrong project (`DNSMeshProtocol/` instead of `DNSMesh/`) | 1 | Moved files with `mv`, removed empty folder |
| Initial landing v1 contained AI slop (3 identical card grids, §01-§04 numbering, formulaic h2 pattern, kitsch "Pre-audit" stamp, manifesto-bait principles list) | 1 | Full rewrite to long-form prose with one diagram and one h2 |
