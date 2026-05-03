# Product

## Register

brand

## Users

Primarily technical: developers, sysadmins, network operators, privacy-conscious users evaluating whether to trust an open protocol with their messaging. They arrive skeptical, read carefully, and decide on technical merit before they decide on tone.

Secondarily: anyone curious enough to follow a protocol explained from first principles. The site should not gatekeep them out, but should never water down the technical claims to court them.

## Product Purpose

DNS Mesh Protocol (DMP) is an open protocol for end-to-end encrypted messaging delivered over plain DNS. There is no central server, no app store, and no relay company in the middle of a conversation. The recipient is found through the same recursive DNS chain that resolves every other domain on the internet. Reads are open TXT lookups; writes are RFC 2136 DNS UPDATE packets signed with per-user TSIG keys.

The brand site exists to make that idea legible. It explains what the protocol is, how the trust model works, how to try it in five minutes, and where to read the specification. It is the front door to the spec, the reference node, and the federation. The protocol is the product; the site is its document.

Apache 2.0, reference implementation in Python, currently pre-external-audit.

## Brand Personality

Three words, set by the protocol itself: **encrypted, federated, social.**

Translated to voice: candid, technical, calm. Honest enough to state the pre-audit status without softening it. Confident enough to explain the wire format without apologizing for the depth. Warm enough that "social" still means something. The tone is closer to a thoughtful RFC than to a SaaS landing.

The mental model the site has to install in a reader's head, in one line:

> DMP is federated email, except it runs on DNS instead of SMTP.

Every page, headline, and code sample should reinforce that anchor. If a reader leaves the site with that one sentence internalized, the brand has worked.

## Anti-references

Hard rules:

- **No gradients anywhere.** Backgrounds, text, buttons, accents.
- **No textured or noisy backgrounds.** Surfaces stay flat.

Aesthetic lanes to avoid:

- **Crypto / Web3** — neon on black, hero gradients, "trustless," wallet imagery, glassmorphism.
- **Corporate security SaaS** — navy + gold, padlock icons, hero-metric ("99.999% uptime"), trust-badge strips.
- **Hacker terminal cosplay** — pure black background, phosphor green text, blinking cursor as decoration, monospace everywhere.
- **Chat-app marketing** — speech bubbles as primary visual, phone mockups, "your friends are already here."

## Design Principles

1. **The protocol document is the brand.** The site reads like a well-typeset spec, not like a marketing page that happens to mention DNS. Editorial typography, prose that earns each word, code samples that actually run.

2. **Federated email is the mental model.** Anchor every explanation to the comparison the user gave: this is federated email over DNS instead of SMTP. Frame trust, federation, identity, and delivery in those terms before introducing protocol-specific vocabulary.

3. **Never oversell what's pre-audit.** The cryptographic audit hasn't shipped. Every page that touches "secure," "private," or "trustworthy" must be reachable from, and consistent with, the SECURITY.md warning. Honesty is the trust signal.

4. **Every claim is reproducible from a `dig` command.** When the site says "anyone can resolve this," the reader can copy a query and verify it from their own shell. Live, signed, federated artifacts (the directory, the heartbeat) are the proof; render them, do not just describe them.

5. **Technical depth without gatekeeping.** Lead with the federated-email anchor so a non-specialist gets it. Then go all the way down to TSIG, prekeys, and DNS UPDATE for the reader who came to verify. Don't pick a layer; layer the page.

## Accessibility & Inclusion

WCAG 2.1 AA as the floor. Specifics:

- All text/background pairs at AA contrast minimum; body copy and code blocks at AAA where reasonable.
- Respect `prefers-reduced-motion`: any reveal, scroll-driven, or decorative animation must be suppressed under the media query.
- Keyboard navigable, visible focus rings, semantic landmarks (`header`, `main`, `nav`, `footer`).
- Code blocks remain readable when copied: no decorative characters that break paste, no font-icon-only labels.
- Avoid color as the only signal: status (e.g., the pre-audit warning) carries text and structure, not just a hue.
