# OP_NET Token Dashboard

![Bitcoin](https://img.shields.io/badge/Bitcoin-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

A React app that connects to OP_WALLET via `@btc-vision/walletconnect` and interacts with an OP_20 token.

**_Please refer to this [Pull Request](https://github.com/grishmasingh/opnet/pull/2) for full code breakdown and code comments._**


## Prerequisites & Setup

**Requirements:**
- Node.js >= 18.0.0
- npm >= 9.0.0
- [OP_WALLET browser extension](https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb)

**Setup:**

```bash
git clone https://github.com/grishmasingh/opnet.git
cd opnet
npm install
cp .env.example .env   # Then fill in your values
npm run dev            # Opens at http://localhost:5173
```

**Scripts:**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Linting

Uses ESLint with TypeScript strict type-checking (`typescript-eslint`).

```bash
npm run lint        # Check for errors
```

Config: `eslint.config.js` extends `eslint.configs.recommended` and `tseslint.configs.strictTypeChecked`.

## Token Configuration

**Default token:** MOTO on regtest network.

| Token | Address |
|-------|---------|
| MOTO | `0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5` |
| PILL | `0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438` |

**To change token:** Update `VITE_TOKEN_ADDRESS` in your `.env` file.

## Environment Variables

> ⚠️ **Never commit secrets.** The `.env` file is gitignored.

Copy `.env.example` to `.env` and configure:

```env
VITE_TOKEN_ADDRESS=0    # OP_20 token contract address
VITE_RPC_URL=https://regtest.opnet.org
VITE_SPENDER_ADDRESS=  # Address for allowance checks
```

**Required keys in `.env.example`:**
- `VITE_TOKEN_ADDRESS`
- `VITE_RPC_URL`
- `VITE_SPENDER_ADDRESS`

## Repository


**Commit Breakdown:**

| Commit | What Changed |
|--------|--------------|
| `9d78cc4` Initial commit | Vite + React + TS scaffolding |
| `3537e32` chore: configure dependencies | Added @btc-vision/walletconnect, opnet, polyfills |
| `77a5078` feat: token metadata | TokenInfoSection displays name/symbol/decimals/supply without wallet |
| `bf921a9` refactor: extract components | Modular structure, added config/hooks/utils, JSDoc comments |
| `b2a918a` feat: user balance | BalanceSection shows balance + allowance when connected |
| `b6497c3` feat: approve transaction | ApproveSection form + TransactionModal with OP_SCAN link |
| `7eb33b1` feat: toast notifications | react-hot-toast for pending/success/error states |
| `b1e6e7a` refactor: UI polish | Final styling adjustments |

## Known Issues & Future Improvements

**Known Issues:**
- Single network only (regtest hardcoded)
- Assumes 18 decimals for approve input
- No `transfer` function (only `increaseAllowance`)

**Future Improvements:**
- [ ] Network selector toggle
- [ ] Transfer tokens functionality  
- [ ] Enhanced form validation (max balance check)
- [ ] Persistent wallet connection
- [ ] Unit tests

## UI/UX Notes

**Accessibility:**
- Form inputs have `<label>` elements with `htmlFor`
- Buttons show disabled state when action unavailable
- Error messages use semantic red color

**Validation:**
- Real-time input validation (negative numbers, non-numeric)
- Inline error messages below inputs
- Button disabled until valid input

**Feedback:**
- Toast notifications for transaction lifecycle (pending → success/error)
- Modal displays tx ID + OP_SCAN explorer link
- Loading states with "Approving..." text

## Documentation & Resources

- This app was built using the [OP_NET Documentation](https://docs.opnet.org/).
- To get testing tokens , please use [OP_NET Faucet](https://faucet.opnet.org/)

---

Built for the OP_NET ecosystem.
