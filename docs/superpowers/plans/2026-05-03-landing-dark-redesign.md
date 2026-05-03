# DNSMesh Landing — Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `landing/index.html` and `landing/styles.css` to ship the Midnight Archive dark landing per `docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md`.

**Architecture:** Single static HTML page + a single CSS file. Token-driven CSS (`:root` custom properties) for the Midnight Archive palette. Three webfont families (Space Grotesk, Newsreader, JetBrains Mono) loaded as one Google Fonts request. No JavaScript. Sections render as a vertical sequence with hairline rules and tonal background shifts (`--bg` / `--bg-2` / `--bg-3`) — no gradients, no textures.

**Tech Stack:** HTML5, CSS (custom properties, `clamp()`, CSS grid, media queries), Google Fonts. Verification via `python3 -m http.server` and visual inspection.

**Note on testing:** This is a static HTML/CSS feature. There is no unit-test framework. "Verification" steps mean: open the page in a browser at the local server URL, and confirm the visible result matches the description. WCAG AA contrast is checked against the palette table in the spec.

**Note on git:** The project directory `/Users/daniel/code/DNSMesh/` is not yet a git repository. Task 0 initializes it. Per user's global `CLAUDE.md`, **never include `Co-Authored-By:` lines in commit messages.**

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `landing/index.html` | rewrite (replaces existing) | Page markup: top bar, strip, hero, anchor, diagram + 3-up, prose, try, notice, footer |
| `landing/styles.css` | rewrite (replaces existing) | Tokens, base, components for all sections; mobile responsive ≤720px |
| `.gitignore` | create | Ignore `.superpowers/`, `.DS_Store`, `node_modules/` (defensive) |

No new files beyond `.gitignore`. The Phase 1 light editorial draft is replaced wholesale; nothing is preserved as fallback.

---

### Task 0: Initialize git and capture current state

**Files:**
- Create: `/Users/daniel/code/DNSMesh/.gitignore`
- Modify: none (baseline commit only)

- [ ] **Step 1: Initialize git repository**

```bash
cd /Users/daniel/code/DNSMesh
git init
git branch -M main
```

- [ ] **Step 2: Create `.gitignore`**

Write `/Users/daniel/code/DNSMesh/.gitignore`:

```
.DS_Store
.superpowers/
node_modules/
*.log
```

- [ ] **Step 3: Stage and commit baseline**

```bash
git add .gitignore PRODUCT.md task_plan.md findings.md progress.md docs/ landing/
git commit -m "chore: baseline commit before dark redesign"
```

Expected: one commit on `main`.

---

### Task 1: Reset `styles.css` with Midnight Archive tokens and base styles

**Files:**
- Modify: `landing/styles.css` (full rewrite, this task replaces lines 1–end with the token block + base)

- [ ] **Step 1: Replace `landing/styles.css` contents with tokens and base reset**

Write `landing/styles.css` (this is the entire file at the end of this step):

```css
/* DNSMesh landing — Midnight Archive dark theme
 * Per docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md
 * Tokens first, then base, then sections in source order.
 */

:root {
  /* Backgrounds */
  --bg:        #0a0d18;
  --bg-2:      #0e1322;
  --bg-3:      #131a2c;

  /* Text */
  --ink:       #e6e8ee;
  --ink-2:     #c4c8d4;
  --ink-3:     #8089a0;
  --ink-4:     #4d5670;

  /* Rules */
  --rule:      #1f2640;
  --rule-2:    #2a3252;

  /* Signal (patinated brass) */
  --signal:    #a89066;
  --signal-2:  #c4ad7e;

  /* Type stacks */
  --serif: "Newsreader", Georgia, serif;
  --sans:  "Space Grotesk", "Inter Tight", system-ui, sans-serif;
  --mono:  "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink-2);
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--signal); color: var(--bg); }

a {
  color: var(--signal);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: rgba(168, 144, 102, 0.35);
}
a:hover { color: var(--signal-2); text-decoration-color: var(--signal-2); }

:focus-visible { outline: 2px solid var(--signal); outline-offset: 2px; }

.shell { max-width: 1180px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 2rem); }
.mono  { font-family: var(--mono); }
.sans  { font-family: var(--sans); }
.serif { font-family: var(--serif); }

.skip {
  position: absolute; left: -9999px; top: 0;
  background: var(--signal); color: var(--bg); padding: 8px 12px;
  font-family: var(--mono); font-size: .82rem;
}
.skip:focus { left: 8px; top: 8px; z-index: 100; }
```

- [ ] **Step 2: Reset `landing/index.html` to a minimal shell**

Write `landing/index.html` (entire file):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DNS Mesh Protocol</title>
<meta name="description" content="An open protocol for end-to-end encrypted messages delivered over DNS. No central server, no app store, no gatekeeper.">
<meta name="color-scheme" content="dark">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css?v=3">
</head>
<body>
<a class="skip" href="#protocol">Skip to protocol</a>
<main></main>
</body>
</html>
```

- [ ] **Step 3: Start a local server and verify the empty shell renders dark**

```bash
cd /Users/daniel/code/DNSMesh
python3 -m http.server 8765 &
echo "open http://localhost:8765/landing/"
```

Expected: page is dark navy-black (`#0a0d18`), no content visible besides a hidden skip link that appears on Tab. No console errors.

- [ ] **Step 4: Commit**

```bash
git add landing/styles.css landing/index.html
git commit -m "feat(landing): reset to Midnight Archive tokens and minimal shell"
```

---

### Task 2: Top bar + mono status strip

**Files:**
- Modify: `landing/index.html` (insert sections inside `<main>`)
- Modify: `landing/styles.css` (append component styles)

- [ ] **Step 1: Add markup**

Replace `<main></main>` in `landing/index.html` with:

```html
<header class="top">
  <div class="shell row">
    <a href="/" class="brand"><span class="dot" aria-hidden="true"></span>DNSMesh</a>
    <nav aria-label="Primary">
      <a href="#protocol">Protocol</a>
      <a href="#try">Try it</a>
      <a href="https://oscarvalenzuelab.github.io/DNSMeshProtocol/protocol" target="_blank" rel="noopener">Spec</a>
      <a href="https://ovalenzuela.com/DNSMeshProtocol/directory/" target="_blank" rel="noopener">Directory</a>
      <a href="https://github.com/oscarvalenzuelab/DNSMeshProtocol" target="_blank" rel="noopener">GitHub</a>
    </nav>
  </div>
</header>

<div class="strip" role="status" aria-label="Protocol status">
  <div class="shell row">
    <span>↳ public dns chain · v0.5.x · federation live since M9</span>
    <span class="audit"><b>pre-external-audit</b></span>
  </div>
</div>

<main></main>
```

- [ ] **Step 2: Append CSS to `landing/styles.css`**

Append to the end of `landing/styles.css`:

```css
/* Top bar */
.top { border-bottom: 1px solid var(--rule); }
.top .row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0;
}
.top .brand {
  font-family: var(--sans); font-weight: 700; letter-spacing: -0.03em;
  font-size: 1.05rem; color: var(--ink); text-decoration: none;
  display: inline-flex; align-items: center; gap: 10px;
}
.top .brand .dot { width: 8px; height: 8px; background: var(--signal); border-radius: 1px; }
.top nav { display: flex; gap: 1.7rem; font-family: var(--sans); font-size: .92rem; }
.top nav a { color: var(--ink-3); text-decoration: none; }
.top nav a:hover { color: var(--signal); }

/* Status strip */
.strip {
  border-bottom: 1px solid var(--rule);
  font-family: var(--mono); font-size: .76rem;
  padding: 9px 0; color: var(--ink-3); letter-spacing: .04em;
}
.strip .row { display: flex; gap: 22px; align-items: center; }
.strip .audit { margin-left: auto; }
.strip b { color: var(--signal); font-weight: 500; }
```

- [ ] **Step 3: Bump cache-bust**

In `landing/index.html`, change `styles.css?v=3` to `styles.css?v=4`.

- [ ] **Step 4: Verify in browser**

Reload `http://localhost:8765/landing/`. Expected:
- Top bar with brass square + "DNSMesh" left, five sans nav links right.
- Below it a mono row: "↳ public dns chain · v0.5.x · federation live since M9" left, "**pre-external-audit**" in brass right.
- Two hairline rules separating top, strip, and (empty) main.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): top bar and status strip"
```

---

### Task 3: Hero — h1, lede, and ledger aside

**Files:**
- Modify: `landing/index.html` (insert hero inside `<main>`)
- Modify: `landing/styles.css` (append hero styles)

- [ ] **Step 1: Add markup**

Replace `<main></main>` with:

```html
<main>
  <section class="hero">
    <div class="shell">
      <div class="grid">
        <div class="lead">
          <h1>Encrypted mail, delivered by the same lookup that finds <em>google.com</em>.</h1>
          <p class="lede">DNS Mesh moves end-to-end encrypted messages between two people over plain DNS &mdash; no relay company, no app store, no account to create.</p>
        </div>
        <aside class="ledger" aria-label="Protocol facts">
          <div class="row"><span class="num">3</span>TXT lookups carry a conversation</div>
          <div class="row"><span class="num">N</span>nodes federating since 2025</div>
          <div class="row"><span class="num">0</span>central servers</div>
        </aside>
      </div>
    </div>
  </section>
</main>
```

(The `N` placeholder is intentional per the spec's open question on real federation node count. Replace before going public.)

- [ ] **Step 2: Append hero CSS**

Append to `landing/styles.css`:

```css
/* Hero */
.hero { padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 4.5rem); }
.hero .grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: end;
}
.hero h1 {
  font-family: var(--sans); font-weight: 700;
  font-size: clamp(2.4rem, 6.4vw, 4.6rem);
  line-height: 0.98; letter-spacing: -0.045em;
  margin: 0 0 1.6rem; color: var(--ink);
}
.hero h1 em {
  font-family: var(--serif); font-style: italic; font-weight: 500;
  color: var(--signal); letter-spacing: -0.02em;
}
.hero .lede {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(1.1rem, 1.8vw, 1.32rem); line-height: 1.5;
  color: var(--ink-2); max-width: 38ch; margin: 0;
}
.hero .ledger {
  border-top: 1px solid var(--rule-2); padding-top: 16px;
  font-family: var(--mono); font-size: .82rem;
  color: var(--ink-3); line-height: 1.7;
}
.hero .ledger .row + .row { margin-top: 14px; }
.hero .ledger .num {
  font-family: var(--sans); font-weight: 700;
  font-size: 1.7rem; letter-spacing: -0.025em;
  color: var(--ink); display: block; line-height: 1; margin-bottom: 3px;
}
```

- [ ] **Step 3: Bump cache-bust to `?v=5`**

- [ ] **Step 4: Verify**

Reload. Expected:
- Headline at left, ~80% of column width, with "google.com" in brass italic Newsreader.
- Lede in serif below, narrow (≤38ch).
- Right column: 280px ledger, three rows separated by 14px, each starting with a big sans number (3 / N / 0).

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): hero with display headline and ledger aside"
```

---

### Task 4: Anchor sentence band

**Files:**
- Modify: `landing/index.html` (append section after `.hero`)
- Modify: `landing/styles.css` (append anchor styles)

- [ ] **Step 1: Add markup**

Inside `<main>`, after the closing `</section>` of `.hero`, append:

```html
<section class="anchor">
  <div class="shell">
    <span class="lbl">mental model</span>
    <p>Think of it as <em>federated email</em>, except it runs on <em>DNS</em> instead of SMTP.</p>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* Anchor sentence (mental model) */
.anchor {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: clamp(2.8rem, 6vw, 4.2rem) 0;
  background: var(--bg-2);
}
.anchor .shell {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: baseline;
}
.anchor .lbl {
  font-family: var(--mono); font-size: .76rem;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--signal);
}
.anchor p {
  font-family: var(--serif); font-weight: 500;
  font-size: clamp(1.5rem, 3.4vw, 2.4rem);
  line-height: 1.18; letter-spacing: -0.02em;
  color: var(--ink); margin: 0; max-width: 32ch;
}
.anchor p em { font-style: italic; color: var(--signal); }
```

- [ ] **Step 3: Bump cache-bust to `?v=6`**

- [ ] **Step 4: Verify**

Reload. Expected: section with slightly lighter ground (`--bg-2`), "mental model" mono label in brass left, big serif sentence right with "federated email" and "DNS" in brass italic.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): anchor sentence band with mental-model label"
```

---

### Task 5: Protocol diagram + 3-up explainer

**Files:**
- Modify: `landing/index.html` (append section)
- Modify: `landing/styles.css` (append diagram + 3-up styles)

- [ ] **Step 1: Add markup**

Append after the `.anchor` section:

```html
<section class="diagram-section" id="protocol">
  <div class="shell">
    <div class="header">
      <h2>Three lookups carry a conversation.</h2>
      <span class="ref">§ protocol shape</span>
    </div>
    <pre class="protocol" aria-label="Protocol exchange diagram">sender                  recursive DNS                  recipient
   │                          │                            │
   │   <span class="q">TXT _dnsmesh-id.bob.dmp.io</span>      │                            │
   ├─────────────────────────►│ ──── cached, like any ────►│
   │   <span class="r">pubkey + prekey</span>                │                            │
   │◄─────────────────────────│                            │
   │                          │                            │
   │   <span class="w">DNS UPDATE  +  TSIG signed</span>     │                            │
   ├─────────────────────────►│ ────── authenticated ─────►│  <i>store ciphertext chunk</i>
   │                          │                            │
   │                          │   <span class="q">TXT _dnsmesh-chunk-7f.…</span>     │
   │                          │◄───────── plain ───────────┤
   │                          │   <span class="r">ciphertext</span>                  │
   │                          │ ──────────────────────────►│</pre>

    <div class="three-up">
      <div class="col">
        <span class="num">i.</span>
        <h3>Identity</h3>
        <p>A name in DNS, not in an app store. Public TXT records under the recipient&rsquo;s domain hold the long-term Ed25519 and X25519 keys.</p>
      </div>
      <div class="col">
        <span class="num">ii.</span>
        <h3>Mailbox slots</h3>
        <p>Forward-secret prekeys advertised the same way. Anyone on the public DNS chain can fetch them; only the holder can answer.</p>
      </div>
      <div class="col">
        <span class="num">iii.</span>
        <h3>Ciphertext</h3>
        <p>Chunked, signed via RFC 8945 TSIG, written with RFC 2136 DNS UPDATE. The recursive chain only ever sees opaque bytes.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* Diagram section */
.diagram-section { padding: clamp(3rem, 7vw, 5rem) 0; }
.diagram-section .header {
  display: flex; justify-content: space-between; align-items: baseline;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 14px; margin-bottom: 26px;
}
.diagram-section h2 {
  font-family: var(--sans); font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.1rem); letter-spacing: -0.03em;
  margin: 0; color: var(--ink); scroll-margin-top: 5rem;
}
.diagram-section .header .ref {
  font-family: var(--mono); font-size: .76rem;
  color: var(--ink-3); letter-spacing: .04em;
}

.protocol {
  font-family: var(--mono); font-size: .86rem; line-height: 1.85;
  background: var(--bg-2); border: 1px solid var(--rule);
  padding: 1.8rem 2rem; overflow-x: auto; white-space: pre;
  color: var(--ink-3); margin: 0;
}
.protocol .q { color: var(--ink); }
.protocol .r { color: var(--signal); font-weight: 500; }
.protocol .w { color: var(--signal-2); font-weight: 500; }
.protocol i { color: var(--ink-4); font-style: italic; }

.three-up {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
  margin-top: 26px; border-top: 1px solid var(--rule);
}
.three-up .col {
  padding: 20px 22px 24px;
  border-right: 1px solid var(--rule);
}
.three-up .col:last-child { border-right: 0; }
.three-up .num {
  font-family: var(--mono); font-size: .76rem;
  letter-spacing: .14em; color: var(--signal);
  margin-bottom: 8px; display: block;
}
.three-up h3 {
  font-family: var(--sans); font-weight: 700;
  font-size: 1.05rem; letter-spacing: -0.02em;
  margin: 0 0 8px; color: var(--ink);
}
.three-up p {
  font-family: var(--serif); font-size: .98rem;
  line-height: 1.55; color: var(--ink-2); margin: 0;
}
```

- [ ] **Step 3: Bump cache-bust to `?v=7`**

- [ ] **Step 4: Verify**

Reload. Expected:
- Header row: sans h2 left, "§ protocol shape" mono ref right, hairline rule below.
- ASCII diagram in mono on `--bg-2` panel; queries in white-cream, reads in brass, writes in lighter brass, italic annotations in low grey.
- Three columns below the diagram, separated by vertical hairlines: "i. Identity", "ii. Mailbox slots", "iii. Ciphertext".

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): protocol diagram and three-up explainer"
```

---

### Task 6: Long-form prose section

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/styles.css`

- [ ] **Step 1: Add markup**

Append after the diagram section:

```html
<section class="prose-section">
  <h2>Reads are open. Writes are signed.</h2>
  <p>That asymmetry is what removes the gatekeeper. Anyone, on any network, can resolve any user&rsquo;s identity, mailbox slots, and chunks &mdash; the records are public TXT entries served by ordinary DNS. Mutations, on the other hand, are RFC&nbsp;2136 DNS UPDATE packets signed with an RFC&nbsp;8945 TSIG key issued per user.</p>
  <p>One HTTPS call mints the key on first registration; after that, no HTTPS hop is involved in publishing identity, refreshing prekeys, or delivering chunks. Every node in the federation accepts those updates from any user whose key it knows about, which means <em>no single node is canonical</em> and none of them can hold a conversation hostage.</p>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* Prose section */
.prose-section {
  padding: clamp(2.8rem, 6vw, 4.2rem) 0;
  max-width: 38rem; margin: 0 auto;
}
.prose-section h2 {
  font-family: var(--sans); font-weight: 700;
  font-size: clamp(1.4rem, 2.4vw, 1.7rem);
  letter-spacing: -0.025em; margin: 0 0 1.4rem; color: var(--ink);
}
.prose-section p {
  font-family: var(--serif); font-size: 1.08rem;
  line-height: 1.7; color: var(--ink-2); margin: 0 0 1.3rem;
}
.prose-section p:last-child { margin-bottom: 0; }
.prose-section p em { color: var(--signal); font-style: italic; }
```

- [ ] **Step 3: Bump cache-bust to `?v=8`**

- [ ] **Step 4: Verify**

Reload. Expected: centered ~38rem column with sans h2 and two serif paragraphs, "no single node is canonical" in brass italic.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): prose section on read/write asymmetry"
```

---

### Task 7: Try-it section with terminal

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/styles.css`

- [ ] **Step 1: Add markup**

Append after `.prose-section`:

```html
<section class="try" id="try">
  <div class="shell">
    <div class="header">
      <h2>Five minutes against the public node.</h2>
      <span class="ref">§ getting started</span>
    </div>
    <p>The reference node at <code>dnsmesh.io</code> is open registration and serves the bootstrap-seed and claim-provider roles other nodes default to. Self-hosting gets the same capabilities &mdash; both modes interoperate over DNS, because the wire is the contract.</p>
    <pre class="terminal" aria-label="Install and first-message commands"><span class="c"># install</span>
pipx install dnsmesh

<span class="c"># the passphrase derives your Ed25519 + X25519 keypair via Argon2id.</span>
<span class="c"># lose it and you lose the identity. there is no recovery.</span>
read -rs <span class="v">DMP_PASSPHRASE</span>; export <span class="v">DMP_PASSPHRASE</span>

<span class="c"># mint a TSIG key, then publish your identity over signed DNS UPDATE</span>
dnsmesh <span class="k">init</span> alice <span class="p">--domain</span> dmp.dnsmesh.io <span class="p">--endpoint</span> <span class="s">https://dnsmesh.io</span>
dnsmesh tsig <span class="k">register</span> <span class="p">--node</span> dnsmesh.io
dnsmesh identity <span class="k">publish</span>
dnsmesh identity <span class="k">refresh-prekeys</span>

<span class="c"># talk to someone who&rsquo;s already published</span>
dnsmesh <span class="k">send</span> bob@dmp.dnsmesh.io <span class="s">"hi bob"</span>
dnsmesh <span class="k">recv</span></pre>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* Try-it (inset terminal) */
.try {
  padding: clamp(3rem, 7vw, 5rem) 0;
  background: var(--bg-3);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.try .header {
  display: flex; justify-content: space-between; align-items: baseline;
  border-bottom: 1px solid var(--rule-2);
  padding-bottom: 14px; margin-bottom: 24px;
}
.try h2 {
  font-family: var(--sans); font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.1rem); letter-spacing: -0.03em;
  margin: 0; color: var(--ink); scroll-margin-top: 5rem;
}
.try .header .ref {
  font-family: var(--mono); font-size: .76rem; color: var(--ink-3);
}
.try p {
  font-family: var(--serif); font-size: 1.05rem; line-height: 1.55;
  color: var(--ink-2); max-width: 50ch; margin: 0 0 1.4rem;
}
.try code {
  font-family: var(--mono); font-size: .92em;
  color: var(--signal);
  background: rgba(168, 144, 102, 0.08);
  padding: .05rem .35rem; border-radius: 2px;
}
.try pre.terminal {
  font-family: var(--mono); font-size: .88rem; line-height: 1.75;
  background: var(--bg); color: var(--ink-2);
  padding: 1.4rem 1.6rem; margin: 0;
  white-space: pre; overflow-x: auto;
  border: 1px solid var(--rule); border-radius: 2px;
}
.try pre.terminal .c { color: var(--ink-4); font-style: italic; }
.try pre.terminal .k { color: var(--signal-2); }
.try pre.terminal .s { color: #d4c186; }
.try pre.terminal .v { color: #b8c4a8; }
.try pre.terminal .p { color: #9eb0d8; }
```

- [ ] **Step 3: Bump cache-bust to `?v=9`**

- [ ] **Step 4: Verify**

Reload. Expected: a recessed section (`--bg-3`) with header row, lede paragraph, and a terminal `pre` panel inset on `--bg` with subtle 1px border. Comments in low grey italic, `dnsmesh` keywords in lighter brass, strings in warm gold, vars in muted green-cream, params in muted blue-cream.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): try-it section with terminal block"
```

---

### Task 8: Notice (pre-audit) and footer

**Files:**
- Modify: `landing/index.html`
- Modify: `landing/styles.css`

- [ ] **Step 1: Add markup**

Append after `.try`:

```html
<section class="warn-section" aria-label="Pre-audit notice">
  <div class="shell">
    <div class="box">
      <span class="lbl">notice</span>
      <p><b>The protocol is not yet audited.</b> Wire format, federation, identity and key rotation, and the formal spec have all shipped, but the cryptographic audit hasn&rsquo;t. Don&rsquo;t route confidentiality-critical traffic through DMP yet. Read <a href="https://github.com/oscarvalenzuelab/DNSMeshProtocol/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> before you trust this with anything that matters.</p>
    </div>
  </div>
</section>
```

After `</main>`:

```html
<footer>
  <div class="shell row">
    <span>DNS Mesh Protocol &middot; Apache&nbsp;2.0 &middot; reference impl in Python</span>
    <span>↳ a name in DNS, not in an app store</span>
  </div>
</footer>
```

- [ ] **Step 2: Append CSS**

```css
/* Notice */
.warn-section { padding: clamp(2.5rem, 5vw, 3.5rem) 0; }
.warn-section .box {
  background: var(--bg-2);
  border: 1px solid var(--signal); border-left-width: 4px;
  padding: 1.4rem 1.6rem;
}
.warn-section .box .lbl {
  font-family: var(--mono); font-size: .76rem;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--signal); display: block; margin-bottom: 8px;
}
.warn-section .box p {
  font-family: var(--serif); font-size: 1.05rem;
  line-height: 1.55; color: var(--ink); margin: 0;
}
.warn-section .box p b { color: var(--signal-2); font-weight: 600; }

/* Footer */
footer {
  border-top: 1px solid var(--rule);
  margin-top: clamp(3rem, 6vw, 4rem);
  padding: 1.8rem 0 2.6rem;
  font-family: var(--mono); font-size: .82rem;
  color: var(--ink-3);
}
footer .row { display: flex; justify-content: space-between; gap: 24px; }
```

- [ ] **Step 3: Bump cache-bust to `?v=10`**

- [ ] **Step 4: Verify**

Reload. Expected: notice box on `--bg-2` with thick brass left border, "notice" mono label, body serif text with "The protocol is not yet audited." in lighter brass bold. Footer mono row at the bottom with two strings split left/right.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/styles.css
git commit -m "feat(landing): pre-audit notice and footer"
```

---

### Task 9: Mobile responsive (≤720px)

**Files:**
- Modify: `landing/styles.css` (append responsive block)

- [ ] **Step 1: Append responsive rules**

Append at the end of `landing/styles.css`:

```css
/* Mobile (≤720px) */
@media (max-width: 720px) {
  .top nav { gap: 1.1rem; font-size: .86rem; }
  .strip .row { flex-wrap: wrap; gap: 10px 22px; }

  .hero .grid { grid-template-columns: 1fr; gap: 2rem; }
  .hero .ledger {
    border-top: 0;
    border-left: 1px solid var(--rule-2);
    padding: 0 0 0 16px;
  }

  .anchor .shell { grid-template-columns: 1fr; gap: 1rem; }

  .three-up { grid-template-columns: 1fr; }
  .three-up .col {
    border-right: 0;
    border-bottom: 1px solid var(--rule);
  }
  .three-up .col:last-child { border-bottom: 0; }

  footer .row { flex-direction: column; gap: 8px; }
}
```

- [ ] **Step 2: Bump cache-bust to `?v=11`**

- [ ] **Step 3: Verify in narrow viewport**

In Chrome DevTools, toggle device toolbar to width ≤ 720px (e.g., iPhone SE, 375px). Expected:
- Hero stacks: headline → lede → ledger (now with left rule, no top rule).
- Anchor: label above sentence.
- Three-up stacks vertically with horizontal rules between cols.
- Footer rows stack.
- No horizontal scrollbars at any width down to 320px (the protocol diagram and terminal `pre` may scroll *internally* — that's fine, they have `overflow-x: auto`).

- [ ] **Step 4: Commit**

```bash
git add landing/styles.css landing/index.html
git commit -m "feat(landing): mobile responsive ≤720px"
```

---

### Task 10: A11y verification pass

**Files:** none (verification only); fixes inline if issues found.

- [ ] **Step 1: Heading order and landmarks**

Inspect with the browser's Accessibility tree (Chrome: DevTools → Elements → Accessibility). Confirm:
- Single `<h1>` (the hero).
- `<h2>` exists for "Three lookups", "Reads are open", "Five minutes".
- `<h3>` exists for the three-up cols.
- Landmarks: `<header>`, `<main>`, `<footer>`, plus the strip has `role="status"`.
- The skip link reaches `#protocol`.

If any `h2` is missing or order is wrong, fix the markup and re-verify.

- [ ] **Step 2: Contrast spot-check**

Using a contrast checker (e.g., Chrome DevTools color picker shows ratio) verify these foreground/background pairs hit AA (4.5:1 for normal text, 3:1 for large text ≥18.66px bold or ≥24px regular):

| Foreground | Background | Min target | Notes |
|---|---|---|---|
| `--ink` `#e6e8ee`   | `--bg` `#0a0d18`   | 7:1 (large)  | display |
| `--ink-2` `#c4c8d4` | `--bg` `#0a0d18`   | 4.5:1        | body |
| `--ink-3` `#8089a0` | `--bg` `#0a0d18`   | 4.5:1        | meta — verify, this is the tightest pair |
| `--signal` `#a89066` | `--bg` `#0a0d18`  | 4.5:1        | links, accents |
| `--ink-2` `#c4c8d4` | `--bg-2` `#0e1322` | 4.5:1        | anchor, notice |
| `--ink-2` `#c4c8d4` | `--bg-3` `#131a2c` | 4.5:1        | try-it body |

If `--ink-3` on `--bg` falls below 4.5:1, brighten `--ink-3` toward `#909aa8` and re-check. Update the spec palette table to match.

- [ ] **Step 3: Keyboard navigation**

Tab through the page. Expected:
- Skip link appears on first Tab.
- Each nav link gets a visible 2px brass outline on focus.
- All `<a>` and `<pre>` elements with `overflow` are reachable.

- [ ] **Step 4: Reduced motion**

In DevTools → Rendering → "Emulate CSS media feature `prefers-reduced-motion: reduce`". Click an in-page anchor link (e.g., the "Protocol" nav). Expected: instant jump, no smooth-scroll animation.

- [ ] **Step 5: If any contrast token was adjusted, bump cache-bust and commit**

```bash
git add landing/styles.css landing/index.html docs/superpowers/specs/2026-05-03-landing-dark-redesign-design.md
git commit -m "fix(landing): a11y contrast and focus pass"
```

If nothing changed in this task, skip the commit.

---

### Task 11: Final cleanup

**Files:**
- Modify: `task_plan.md`, `progress.md` (update status)

- [ ] **Step 1: Update planning files**

In `task_plan.md`, mark Phase 4 (Iterate landing v2) as complete and add a Phase 4b entry: "Dark redesign per spec 2026-05-03 — shipped".

In `progress.md`, append a new session entry for 2026-05-03 noting the dark redesign was implemented.

- [ ] **Step 2: Final visual sweep**

Reload the page at desktop and at 375px width once more. Read the page top-to-bottom as if you'd never seen it. Look for:
- Any `?v=N` mismatch between `index.html` and an outdated cached css (hard-refresh: Cmd+Shift+R).
- Any `<em>` or `<b>` accent that landed on the wrong color (should be `--signal` or `--signal-2`, not raw inheritance).
- Any section that needs a `scroll-margin-top` because the top bar covers it on anchor jumps.

If any cosmetic issue, fix and bump `?v=`.

- [ ] **Step 3: Commit**

```bash
git add task_plan.md progress.md landing/
git commit -m "chore: complete dark landing redesign"
```

---

## Self-Review

**Spec coverage:** Each section in the spec's section map (1–9) is built in Tasks 2–8. Palette tokens are seeded in Task 1. Typography stacks come in via Task 1's `:root`. Mobile is Task 9. A11y (contrast, focus, reduced-motion, skip link) is Task 10. Performance (single Google Fonts request, no images) is satisfied by Task 1's `<link>`. The "Out of scope" items (spec page, getting-started, directory page, light theme, hosting decision) are not implemented, as required.

**Placeholder scan:** No `TBD`/`TODO` in the plan body. The hero ledger uses `N` for federation node count — flagged in Task 3 step 1 as deliberate per the spec's Open Questions, not a plan placeholder.

**Type consistency:** Class names match across markup and CSS — `.top`, `.strip`, `.hero`, `.ledger`, `.anchor`, `.diagram-section`, `.protocol`, `.three-up`, `.prose-section`, `.try`, `.terminal`, `.warn-section`, `.box`, `footer`. Token names (`--bg`, `--ink`, `--signal`, etc.) are consistent across all CSS appends.
