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

## Open questions for the user

- **Hosting domain.** New domain vs. replacing `dnsmesh.io` root vs. subroute. Affects internal link targets and the relationship copy with the existing node page.
- **DESIGN.md generation.** Run `$impeccable document` against `landing/styles.css` now (yes/no/later)?
- **Build/deploy target.** GitHub Pages, Cloudflare Pages, Caddy on the existing node, or just static drop?
