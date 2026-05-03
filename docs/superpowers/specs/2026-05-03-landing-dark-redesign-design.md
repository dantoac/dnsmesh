# DNSMesh Landing — Dark Redesign

**Date:** 2026-05-03
**Replaces:** `landing/index.html` + `landing/styles.css` (Phase 1 light editorial draft)
**Status:** Design approved by user; pending implementation plan.

## Goal

Rebuild the DNSMesh brand-only landing as a **dark-only**, sophisticated, infrastructure-coded surface. The landing must install one mental model on first read:

> Think of it as federated email, except it runs on DNS instead of SMTP.

The page should feel **reliable, sophisticated, private** — like an operations room or a private archive at night, not a marketing site, a crypto product, or a hacker dashboard.

## Visual Direction

**Mood:** *Switchboard tempered to dark.* Bold display typography on a dark ground, geometric/diagrammatic motifs as the primary visual content, a single restrained metallic accent. The diagrams are the brand.

**Anti-references** (carry over from PRODUCT.md, reaffirmed):

- No gradients
- No textured backgrounds
- No security-SaaS corporate dark blue
- No hacker-cosplay neon-on-black
- No crypto/Web3 dark+neon palettes
- No pure `#000` or `#fff`

## Palette — Midnight Archive

Single dark theme. No light theme. No theme toggle.

| Token | Hex | Tonal description | Role |
|---|---|---|---|
| `--bg`        | `#0a0d18` | iron-gall ink, almost-black, slight blue-grey warmth | page ground |
| `--bg-2`      | `#0e1322` | one step lighter | anchor band, protocol diagram fill, notice box fill |
| `--bg-3`      | `#131a2c` | two steps lighter | inset/recessed sections (e.g. `Try it`) |
| `--ink`       | `#e6e8ee` | cool cream | display + headings |
| `--ink-2`     | `#c4c8d4` | grey-blue cream | body text |
| `--ink-3`     | `#8089a0` | mid grey-blue | meta, datelines, secondary nav |
| `--ink-4`     | `#4d5670` | low-emphasis grey-blue | diagram annotations, italic asides in dark blocks |
| `--rule`      | `#1f2640` | hairline rule | section dividers on `--bg` |
| `--rule-2`    | `#2a3252` | secondary rule | dividers inside `--bg-2`/`--bg-3` |
| `--signal`    | `#a89066` | patinated brass / aged gold | accent: links, highlight italic, ledger numbers |
| `--signal-2`  | `#c4ad7e` | brighter brass | hover, code keywords |

**Rules:**

- Accent never used as a fill across large surfaces; only as ink on text, hairline borders, or small swatches (≤16px).
- Text on `--bg` must hit WCAG AA contrast (`--ink-2` ≥ 7:1, `--ink-3` ≥ 4.5:1).
- Color is never the sole signal: every accent appearance pairs with a structural element (border, rule, italic).

## Typography

| Stack | Family | Use |
|---|---|---|
| Sans display | **Space Grotesk**, Inter Tight, system-ui | h1/h2/h3, brand mark, ledger numerics, nav |
| Serif | **Newsreader**, Georgia, serif | body prose, lede, anchor sentence, italic accents inside h1 |
| Mono | **JetBrains Mono** | dateline strip, diagrams, terminal code, refs, footer |

Loaded via Google Fonts with `display=swap` and explicit weights: Space Grotesk 400/500/700, Newsreader italic+roman 400/500/600 with `opsz` 6..72, JetBrains Mono 400/500.

**Display rule for headings:** Space Grotesk 700, `letter-spacing: -0.045em`, `line-height: 0.98`. Italic pivots inside headings switch to Newsreader italic 500 in `--signal` — this is the tonal "switch" that gives the page its character.

**Body rule:** Newsreader 400, 17px base, `line-height: 1.55–1.7` depending on column width. Prose column max-width `38rem`; never wider.

## Layout — Section Map

The page is a vertical sequence of horizontally full-bleed sections, each with its own internal grid. Section boundaries are marked by hairline rules and tonal shifts (`--bg` → `--bg-2` → `--bg-3`), never by gradients.

| # | Section | Background | Width strategy |
|---|---|---|---|
| 1 | Top bar (brand + nav)            | `--bg`   | shell, single row, 1px rule below |
| 2 | Mono strip (status + audit flag) | `--bg`   | shell, mono, 1px rule below |
| 3 | Hero (h1 + lede + ledger aside)  | `--bg`   | shell, 1fr / 280px grid, ends-aligned |
| 4 | Anchor sentence (mental model)   | `--bg-2` | shell, 200px / 1fr grid, baseline-aligned |
| 5 | Protocol diagram + 3-up explainer | `--bg`  | shell; ASCII diagram full-shell width; 3 columns separated by vertical rules |
| 6 | Long prose (reads/writes asymmetry) | `--bg` | centered 38rem column |
| 7 | Try it (terminal block)          | `--bg-3` | shell; inset terminal pre on `--bg` with 1px rule |
| 8 | Notice (pre-audit warning)       | `--bg`   | shell; box on `--bg-2` with 4px left border in `--signal` |
| 9 | Footer                           | `--bg`   | shell, mono, 1px rule above |

**Shell:** `max-width: 1180px`, padding `clamp(1.25rem, 4vw, 2rem)`. The prose column (Section 6) is narrower at `38rem`.

**Hero ledger:** three rows, each "big number / label". Numbers are Space Grotesk 700, ~1.7rem. Labels are mono ink-3. The ledger sits to the right of the headline at desktop and falls below it on mobile (≤720px), where the border-top becomes a border-left.

## Components

- **Brand mark**: small (8px) brass square + "DNSMesh" sans 700.
- **Strip**: 9px-padded mono row, `↳` glyph as the protocol-feel ornament. Audit flag right-aligned in `--signal`.
- **Anchor band**: shorter horizontal rules above and below; the sentence is the largest serif on the page (clamp ~1.5rem to 2.4rem). Two italic spans in `--signal`: "federated email" and "DNS".
- **Protocol diagram**: full-shell pre-formatted ASCII on `--bg-2`, with three color classes — `.q` (queries, ink), `.r` (reads, signal), `.w` (writes, signal-2), `i` (annotations, ink-4 italic).
- **3-up explainer**: directly under the diagram, three columns separated by vertical rules. Each col: roman-numeral label in mono signal, sans h3, serif paragraph. No card backgrounds — only rules.
- **Terminal block**: `pre` on `--bg` with 1px rule, sitting inside `--bg-3` section. Mono syntax classes: `.c` (comment, ink-4 italic), `.k` (keyword, signal-2), `.s` (string, warm gold), `.v` (var, muted green-cream), `.p` (param, muted blue-cream).
- **Notice box**: `--bg-2` fill, 1px border with 4px left border in `--signal`. Mono "notice" label in `--signal`. Body in serif on full ink. Replaces the kitsch "pre-audit stamp" anti-pattern.

## Behavior

- **No animations** beyond CSS smooth-scroll on anchor links.
- **`prefers-reduced-motion`**: smooth-scroll suppressed.
- **No JS required** for any visual or content layer. The page is fully static HTML + CSS.
- **Focus styles**: visible 2px outline in `--signal` on all interactive elements; never removed.

## Accessibility

- WCAG 2.1 AA contrast verified against `--bg`, `--bg-2`, `--bg-3` for every text role.
- Color never the sole carrier of meaning (all accent uses pair with rules, italics, or labels).
- All images/diagrams have `aria-label` or text equivalents.
- Skip link to `#protocol` from top.
- Logical heading order (single h1, h2 per section).

## Performance

- Three font families, deduplicated to a single Google Fonts request, `display=swap`, preconnects.
- No imagery beyond ASCII text. Total page weight target ≤ 60 KB excluding fonts.
- Cache-bust query string on `styles.css?v=N` per the user's standing rule.

## File Structure

```
landing/
├── index.html        # rewritten; structure above
└── styles.css        # rewritten; Midnight Archive tokens + components
```

Old Phase 1 files are replaced wholesale, not preserved as a fallback.

## Out of Scope (future phases)

- Spec page styling
- Getting-started walkthrough page
- Live directory page
- Hosting/deploy decision (still pending; landing must work as a flat-file drop)
- Light theme (explicitly excluded — single dark theme only)

## Open Questions Carried Forward

These do not block implementation but should be answered before going public:

1. Final hosting domain (new domain vs `dnsmesh.io` root vs subroute).
2. Deploy target (GitHub Pages, Cloudflare Pages, Caddy on a node, etc.).
3. Real ledger numbers for the hero (current: 3 / 42 / 0 — `42` is a placeholder; need real federation node count or replace the row).
