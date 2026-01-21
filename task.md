New‑Hire Task: Connect with @btc-vision/walletconnect & Interact with an OP_20 Token
Overview
Build a tiny React app that connects a wallet using @btc-vision/walletconnect and reads/writes to an OP_20 token (OP_NET’s ERC‑20‑like standard). This is scoped to take ~half a day for someone comfortable with React + TypeScript.
Objectives
Connect a wallet via @btc-vision/walletconnect.


Display account and network.


Disconnected state: show token metadata fetched from the configured OP_20: name, symbol, decimals, maxSupply, totalSupply.


Connected state: show symbol, user balance, and allowance (for a configured SPENDER).


Write one transaction: approve or transfer, and show tx id/status.


Use an OP_NET test network and a known OP_20 token (address via env).


Design & UX Requirements (New)
The UI must be nice, clean, and user-friendly:


Simple, uncluttered layout with clear hierarchy and spacing.


Responsive (desktop + small screens).


Accessible labels, helpful validation messages, and obvious error states.


Consistent styling (Tailwind or minimal CSS), with clear CTAs and readable typography.


Deliverables
Minimal React app (Vite + TS).


/src source and a short README (how to run, which token used, assumptions).


A 30–60s screen capture showing: connect → read → write → explorer link.


Git repository hosted on GitHub/GitLab (public or share access) with the full project history.


Repository & Submission
Share a link to the Git repo.


Include the recording in the repo under /docs/ (e.g., docs/demo.mp4) or link it in the README.


Commit history should include at least a few atomic commits (e.g., setup, connect, read, write, polish).


No secrets committed (env via .env.example).


Acceptance Criteria (Reviewer Checklist)
Repo submission: A Git repo link is provided (public or with access granted). The repo contains source code, README, and the screen capture (file in /docs or linked). No secrets in version control; .env.example present.


The Connect button opens a wallet flow; after connecting, the UI shows address.


Network label reflects the connected network from account.network.


Read state:


When not connected: UI shows token metadata from the configured OP_20 without requiring a wallet: name, symbol, decimals, maxSupply, totalSupply.


When connected: UI shows token symbol, user balance, and allowance for SPENDER.


Write section successfully executes one of:


approve(SPENDER, amount) or


transfer(to, amount)


After sending, a modal shows transaction id and a link to OP_SCAN.


Errors handled gracefully (not connected, bad address, user rejection, RPC issues) with user-friendly messages.


ESLint Standard config; npm run lint passes with no errors.


UI Quality (New):


The layout is clean, readable, and responsive.


Forms have labels/placeholders; disabled states and loading states are obvious.


Error + success feedback is clear (inline text and/or toast).


No visual jitter; components align consistently.


Tech Stack
React + Vite + TypeScript


@btc-vision/walletconnect (provider + hooks)


opnet (contract utils + OP_20 ABI)


Styling: Tailwind or simple CSS


Testing Guide
Fund the test account with enough for fees.


Before connecting: confirm the app renders token name, symbol, decimals, maxSupply, totalSupply from the configured token.


Connect via OP_WALLET (or supported wallet) and confirm account/network render.


Read (connected): verify symbol/balance/allowance match explorer.


Write: run approve or transfer with a small amount; confirm a tx id appears and resolves on the explorer.


Negative paths: reject the tx in wallet, try malformed addresses, disconnect mid‑flow—UI should surface clear, friendly errors and preserve form input.


README Requirements
Prereqs (Node version), setup, run scripts.


Linting: mention ESLint Standard config and how to run npm run lint / npm run lint:fix.


Source of the token address (deployed or known OP_20) and how to change it.


Notes on not committing secrets + provide a .env.example with required keys.


Link to the recording (or path to /docs/demo.mp4).


Repository details: repo URL and brief commit breakdown (what changed in each stage).


Known issues & future improvements (form validation, toast notifications, multiple networks).


UI notes: brief mention of accessibility/UX choices (labels, validation, focus states).


Stretch Goals (Optional)
Separate status toasts for pending/confirmed/failed.


Support multiple OP_NET networks with a simple toggle.


Basic unit tests for formatting + happy‑path calls.


Utilities
RPC URL: regtest.opnet.org


Faucet: https://faucet.opnet.org


OP_SCAN: https://opscan.org


WalletConnect: https://www.npmjs.com/package/@btc-vision/walletconnect?activeTab=readme


Documentation: https://docs.opnet.org


Test Tokens:


MOTO: 0xb7e01bd7c583ef6d2e4fd0e3bb9835f275c54b5dc5af44a442b526ebaeeebfb9



PILL: 0x186f943f8b0f803be7a44fce28739ff65953cf2bd83687a392186adaf293a336






OR
MOTO: opr1sqp5pkzs9w8ktx020jymxvs05ekc7jahl45r5t9pz / 0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5
PILL: opr1sqq2quumshz8tvr78n3f69fqxsxkqjycc8yz9vzyg / 0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438




