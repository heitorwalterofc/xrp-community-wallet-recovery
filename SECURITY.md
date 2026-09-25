# Security Notes

- This tool runs locally. It does not send data over the network.
- The recovery phrase is never printed or saved to disk by the script.
- The `--show-family-seed` option prints the family seed only when the derived address matches the target address. Never share this output.
- Before moving funds, verify the derived address independently.
- Send a small test transaction first.
- Prefer transferring to a newly initialized hardware wallet.
