# Findings — DNSMesh Brand Site

## Source projects

- **`/Users/daniel/code/DNSMeshProtocol/`** — the actual protocol repo. README is the canonical content source: install steps, trust model paragraph, three-lookup mechanic, pre-audit warning, dnsmesh.io reference node.
- **`/Users/daniel/code/DNSMesh/`** — this project. New brand-only site. Initially empty before we started.

## Existing surface to coexist with

- **`https://dnsmesh.io/`** — node operator status page. Plain text, monospace/serif minimal, light theme. Sections: endpoint identification, registration shell commands, public operator key, `/health` and `/stats` API endpoints, links to docs/GitHub/PyPI. Tone: purely functional, no marketing. **This page should stay austere; the brand site is a separate layer above it.**
- **`https://oscarvalenzuelab.github.io/DNSMeshProtocol/`** — current Jekyll docs site using Just-the-Docs theme. Generic. Will likely get replaced or restyled later, but out of scope for Phase 1-6.
- **`https://ovalenzuela.com/DNSMeshProtocol/directory/`** — live signed directory of nodes advertising on the public DNS chain, rebuilt every 30 minutes from a federated seed list.

## Protocol facts to preserve in copy

(Sourced from `DNSMeshProtocol/README.md` direct quotes, treat as authoritative.)

- **Identity = DNS name.** Per `dnsmesh.io` itself.
- **End-to-end encrypted; DNS is the transport.** No central server, no app store, no relay company.
- **Three lookups carry a conversation:** identity record, mailbox slots, ciphertext chunks. All TXT records under the recipient's domain.
- **Reads are open.** Plain DNS TXT through the public recursive chain.
- **Writes are signed.** RFC 2136 DNS UPDATE + RFC 8945 TSIG, per-user keys minted via one-shot HTTPS at registration.
- **Federation is live since M9 (0.5.x).** Anti-entropy across nodes; no canonical node.
- **Identity keys derive from a passphrase via Argon2id (Ed25519 + X25519).** Lose passphrase = lose identity, no recovery.
- **Forward-secret prekeys** for first-message security.
- **License:** Apache 2.0.
- **Reference impl:** Python.
- **Status:** pre-external-audit. SECURITY.md has the canonical warning text.
- **Tech the wire actually uses:** RFC 1035 reads, RFC 2136 writes, RFC 8945 TSIG. Not DNS-over-HTTPS reskinned.

## User-supplied direction

- Site is **brand-only** (no app/dashboard).
- Audience: **anyone, but principally technical**.
- Personality words: **encrypted / federated / social.**
- Mental anchor (used as the strategic principle): **"this is like federated email using DNS servers."**
- Hard anti-references: **no gradients, no textured backgrounds.**

## Design decisions committed in Phase 1 draft

- **Color strategy:** Committed. Terracotta `oklch(0.55 0.18 38)` carries identity. Background ivory `oklch(0.985 0.006 80)`, ink `oklch(0.18 0.012 60)`. Tinted neutrals throughout — no `#fff` / `#000`.
  - Rationale: anti-reflex. Domain is "DNS / encrypted messaging," whose category-reflex palettes are dark-blue, neon-green, or neon-on-black. Terracotta evokes paper / RFCs / postal infrastructure — the "delivered over what's already there" essence.
- **Theme:** light, editorial. Scene sentence: *a skeptical sysadmin evaluating a protocol on a 27" monitor at midday, deciding whether to trust it with sensitive data.*
- **Typography:** Fraunces (variable, opsz + SOFT axes), Inter Tight, JetBrains Mono. All via Google Fonts. Body 18px / 1.6, lede serif 1.32rem, h1 clamp(2.2rem, 5.6vw, 3.6rem) at weight 360.
- **Layout:** single ~38rem prose column. No grid of cards. One full-bleed ASCII diagram. One h2.
- **Components:** dateline (mono, lowercase), bigtype (serif pivot heading), codeblock (dark, manual syntax highlighting), diagram (mono full-bleed with three colors), warn (terracotta-tinted full-border callout, no side stripe), aside (left rule, ink-3 prose), next (serif farewell paragraph).

## AI-slop instances killed in v1 → v2 rewrite

| Pattern | Where | Replaced with |
|---|---|---|
| 3 identical card grids | three-lookups, two-col duo, four principles | one prose section with one full-bleed diagram |
| Section numbering §01-§04 with terracotta rule | every section header | single `h2` with descriptive text |
| Formulaic `[Statement]. <em>That's the [thing].</em>` h2 | 4× across sections | each heading has unique structure |
| Trust-badge meta strip | top of page | removed entirely |
| Asymmetric hero with `<aside>` editorial trick | hero | single-column lede |
| Rotated `-2deg` "Pre-audit" stamp | callout | text-only `<p class="warn">` |
| Manifesto "Four principles i/ii/iii/iv" | section | absorbed into prose paragraph |

## i18n strategy options

User confirmed (2026-05-03 session 3): **English is the canonical source, ES is a faithful translation, more languages possible later.**

Three viable approaches for a static-first site whose deploy target is still undecided:

| Option | How it works | Pros | Cons |
|---|---|---|---|
| **(a) Dual static files** | `index.html` (EN) + `es/index.html` (ES). Each is a complete page; a small JS toggles via `location` and persists in `localStorage`. | Trivial to host on any static target. Crawlable per-language. Works without JS. Simplest mental model. | Two files to keep in sync — copy drift risk if discipline slips. |
| **(b) Build-time render** | Single source (JSON/YAML dict + Jinja-style template) renders to both files at build time. Could be a 30-line Python script. | Single source of truth, no drift. Easy to add a 3rd language. | Requires a build step → contradicts the current "drop a folder" simplicity. Couples i18n decision to Phase 6. |
| **(c) Client-side swap** | One HTML with `data-i18n="key"` attributes; tiny JS loads `en.json`/`es.json` and swaps text on click. | One HTML file. No build. Easy to extend. | Requires JS for translated content (FOUC + bad SEO for ES). Bots see only EN. Worst for accessibility/crawlability. |

**Decision (2026-05-03 session 3, post-recommendation):** user chose **(b) build-time render via Eleventy 3.x**. The "no build chain" ethos is relaxed in exchange for: single source of truth for shared strings, idiomatic i18n via the bundled `I18nPlugin`, painless 3rd-language addition later, and a clean platform for the adjacent surfaces in Phase 7 (spec, getting-started). See "Eleventy migration plan" below.

Open sub-questions before implementing:

- URL shape: `/` (EN) + `/es/` via `addUrlTransform`, **or** `/en/` + `/es/` with a root redirect/splash. Former is friendlier for the default audience; latter is more symmetric.
- Default-language detection: respect `navigator.language` on first visit, persist override in `localStorage`. Never auto-redirect based on geolocation.
- Switch placement: header (visible always) vs. footer (calmer, fits austere brand). Lean footer + `lang` attribute on the link.

## Eleventy migration plan

**Stack (verified via context7, 2026-05):**

- Eleventy `^3.x` (stable since Oct 2024, ESM-friendly, Node 18+ required).
- ESM config: `"type": "module"` in `package.json`, `eleventy.config.js` exporting default function.
- Template language: **Nunjucks** (`.njk`) — recommended for broadest i18n example coverage; Liquid/WebC also viable.
- i18n: bundled `I18nPlugin` imported from `@11ty/eleventy`. Provides `locale_url`, `locale_links` filters. Configure with `defaultLanguage: "en"`.

**Canonical setup pattern:**

```js
// eleventy.config.js (ESM)
import { I18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(I18nPlugin, { defaultLanguage: "en" });
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  return { dir: { input: "src", output: "_site" } };
}
```

**Layout pattern (in `src/_includes/base.njk`):**

```njk
<html lang="{{ page.lang or 'en' }}">
<head>
  {% for locale in locale_links(page.url) %}
    <link rel="alternate" href="{{ locale.url }}" hreflang="{{ locale.lang }}">
  {% endfor %}
  ...
</head>
```

**Proposed project tree:**

```
DNSMesh/
  package.json              "type": "module", scripts: build/dev
  eleventy.config.js
  .gitignore                # adds node_modules/, _site/
  src/
    _includes/
      base.njk              # shared <head>, <body>, footer with switcher
    _data/
      site.json             # site-wide constants (canonical URL, year, etc.)
      i18n/
        en.json             # shared strings: footer, nav, meta
        es.json
    en/
      index.njk             # English landing (canonical)
    es/
      index.njk             # Spanish landing (faithful translation)
    styles.css              # passthrough → /styles.css
  landing/                  # KEPT during migration; deleted after parity confirmed
  _site/                    # build output (gitignored)
```

**Migration sequence (proposed):**

1. Scaffold Node project + `eleventy.config.js` + `.gitignore` updates.
2. Build `base.njk` layout + footer switcher; verify dev server (`eleventy --serve`) renders an empty EN/ES page.
3. Port `landing/index.html` content verbatim into `src/en/index.njk` extending `base.njk`. Visual parity with current dark redesign is the gate.
4. Translate to `src/es/index.njk` (technical register, no domestication).
5. Extract shared strings (footer label, "language", date format, meta description, nav) into `_data/i18n/{en,es}.json`.
6. AA contrast + responsive sweep on both languages.
7. Delete legacy `landing/` once both languages reach parity.
8. Wire deploy to chosen target (Phase 6) — `_site/` is the artifact.

## Verificación canónica contra dnsmeshprotocol.org (2026-05-03 sesión 6)

Fuente: `https://dnsmeshprotocol.org/` (homepage) + `/how-it-works.html`. Tratar como autoritativo cuando hay conflicto con el copy local.

### Hechos canónicos extraídos de how-it-works.html

- **Identidad:** `id-<sha256(subject)[:16]>.<zone>` — bajo la zona del **propio usuario**, no con prefijo `_dnsmesh-`.
- **Mailbox slots:** `slot-N.mb-{hash(bob)}.<alice's mesh_domain>` — viven en la zona del **remitente** (Alice), no del receptor. El receptor camina hacia atrás las zonas de los remitentes vía DNS recursivo.
- **Chunks:** `chunk-*-*.<zone>` — bajo la zona del remitente.
- **Claim records:** `_dnsmesh-claim-*.<zone>` — el prefijo `_dnsmesh-` está reservado para estos (first-contact), no para identity/chunks.
- **Cripto:** Ed25519 (firma), X25519 (ECDH), ChaCha20-Poly1305 (AEAD), Argon2id (KDF), SHA-256 (hash + mailbox addressing).
- **Flujo de escritura (M9):** RFC 2136 DNS UPDATE firmado con TSIG (RFC 8945), per-user TSIG keys con scope wildcard por owner-name (`id-…`, `slot-*.mb-*`, `chunk-*-*`).
- **Cluster anti-entropy:** HTTP en `/v1/sync/digest` y `/v1/sync/pull` — *"don't fit cleanly into DNS"*.
- **Limitaciones explícitas:** no garantiza entrega sub-segundo; metadata privacy contra el operador del nodo no está cubierta (traffic analysis leak).

### Hechos canónicos extraídos de la homepage

- Hero canónico: *"End-to-end encrypted messaging with no central server, no app store, no gatekeeper — delivered over DNS, on the relays and infrastructure the internet already runs on."*
- Install command canónico:
  ```
  pipx install dnsmesh
  dnsmesh init alice --domain <your-zone> --endpoint dnsmesh.io
  dnsmesh tsig register --node dnsmesh.io
  dnsmesh identity publish
  ```
  - **Endpoint sin `https://`** (la canónica no incluye el esquema)
  - **`<your-zone>`** como placeholder, no `dmp.dnsmesh.io`
- Versión actual: **v0.2.0-beta**. Hito futuro: **v1.0**.
- Roadmap milestones citados: M10 (Notifications), M4.2–M4.4 (auditoría externa), M5.2 (mobile), M5.3 (web/WASM), M6 (traffic-analysis resistance).
- RFCs explícitamente citados: 2136, 8945. (No 1035 — nuestro `findings.md` antiguo lo asumía como "RFC 1035 reads"; correcto pero no resaltado en canónica.)

### Discrepancias landing local vs. canónica

| Campo | Landing local | Canónica | Acción |
|---|---|---|---|
| Hero (EN) | "Encrypted mail, delivered by the same lookup that finds google.com." | "End-to-end encrypted messaging…" | Acceptable — copy creativa, mismo significado, agrega anchor concreto. Mantener. |
| `site.version` | `0.5.x` | `v0.2.0-beta` | Verificar con usuario cuál es real |
| `strip.federation` | "federation live since M9" | M9/M10 son hitos roadmap | Coexisten; OK siempre que la versión sea correcta |
| Terminal `--endpoint` | `https://dnsmesh.io` | `dnsmesh.io` | Quitar `https://` para alinear con canónica |
| Terminal `--domain` | `dmp.dnsmesh.io` | `<your-zone>` | Decisión: placeholder concreto vs. abstracto |
| `site.json` `spec` | `oscarvalenzuelab.github.io/DNSMeshProtocol/protocol` (Jekyll legacy) | `dnsmeshprotocol.org/protocol/spec.html` | Actualizar a canónica viva |
| `site.json` `directory` | `ovalenzuela.com/DNSMeshProtocol/directory/` | `dnsmeshprotocol.org/directory/` | Considerar redirigir a canónica |
| Morph Phase 1 ID | `_dnsmesh-id.bob.dmp.io` | `id-<hash>.<zone>` | ✅ corregido sesión 6 |
| Morph Phase 3 chunk | `_dnsmesh-chunk-7f` (recipient lane) | `chunk-N-M.<sender-zone>`, recipient walks sender zone | ✅ corregido sesión 6 (label + flechas) |
| `.dm-store` posición | Col 3 (recipient) | Storage en nodo autoritativo del **sender** | ✅ corregido sesión 6 (col 1) |
| Copy `diagram.ii` (mailbox slots) | "punteros que el sender escribe en su propia zona" | ✅ alineado con spec |
| Copy `diagram.iii` (ciphertext) | RFC 8945 TSIG + RFC 2136 UPDATE | ✅ alineado con spec |

## Open questions for the user

- **Hosting domain.** New domain vs. replacing `dnsmesh.io` root vs. subroute. Affects internal link targets and the relationship copy with the existing node page.
- **DESIGN.md generation.** Run `$impeccable document` against `landing/styles.css` now (yes/no/later)?
- **Build/deploy target.** GitHub Pages, Cloudflare Pages, Caddy on the existing node, or just static drop?
- **i18n strategy.** Confirm (a) dual static files (`/` EN + `/es/` ES), or pick (b) or (c) above.
- **Language switch placement.** Header vs. footer (recommendation: footer, matches austere brand).
- **ES translator.** Does the user write ES copy, or does Claude draft and the user reviews?
