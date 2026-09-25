# XRP Community Wallet Recovery Tool

A local-only tool for checking BIP39 phrases from XRP Community Wallet and deriving the corresponding XRPL address.

> **Important:** Never enter a recovery phrase into a website or online service. Run this project locally, preferably on a trusted computer without unnecessary browser extensions.

## What this project does

The derivation method used by the wallet is:

```text
BIP39 mnemonic
→ BIP39 entropy
→ ripple-keypairs.generateSeed({ algorithm: "ed25519" })
→ XRPL family seed
→ XRPL address
```

The program does not query the blockchain and never sends the recovery phrase over the network. It only derives the address locally.

## Requirements

- Node.js 20 or later
- npm

## Installation and execution

Follow these steps in a terminal.

### 1. Verify the prerequisites

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

Node.js 20 or later is required.

### 2. Open the project directory

Change to the directory containing this project:

```bash
cd /path/to/xrp-recovery-tool
```

Replace `/path/to/xrp-recovery-tool` with the actual local path.

### 3. Install dependencies

Install the dependencies locally:

```bash
npm install
```

The project uses only the local packages declared in `package.json`.

### 4. Run the address check

Pass only the public address as a command-line argument:

```bash
node recover.mjs "YOUR_TARGET_XRP_ADDRESS"
```

Replace `YOUR_TARGET_XRP_ADDRESS` with the public address you want to verify. The program will request the recovery phrase without displaying it in the terminal. The output will look similar to:

```text
Derived address: r...
Provided address: r...
Matches: YES
```

Do not pass the recovery phrase as a command-line argument. It may be saved in the shell history or visible in the process list.

## Show the family seed

Use this option only when you need to import the account into an XRPL wallet that accepts a family seed:

```bash
node recover.mjs "YOUR_TARGET_XRP_ADDRESS" --show-family-seed
```

Replace `YOUR_TARGET_XRP_ADDRESS` with the public address before running the command. The family seed controls the funds. Never publish it, send it in a chat, or paste it into a website. If the derived address does not match the target address, do not use the family seed.

## Security

- This code has no telemetry, backend, or recovery API.
- Never ask another person for their recovery phrase.
- Never store recovery phrases in issues, pull requests, logs, or repository files.
- Verify the derived address before signing any transaction.
- Send a small test transaction to a new wallet first.
- Prefer transferring funds to a newly initialized hardware wallet.
- This repository does not automatically sign or broadcast transactions.


## Disclaimer

Use this tool at your own risk. Always review the source code and verify the derived address independently before moving funds.

## License

MIT
