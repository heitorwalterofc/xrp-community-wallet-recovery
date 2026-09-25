import { mnemonicToEntropy } from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english.js';
import * as rippleKeypairs from 'ripple-keypairs';

const target = process.argv[2] ?? '';
const showFamilySeed = process.argv.includes('--show-family-seed');

async function readSecret() {
  if (!process.stdin.isTTY) {
    let value = '';
    for await (const chunk of process.stdin) value += chunk;
    return value.trim();
  }

  process.stdout.write('Seed phrase (não será exibida): ');
  process.stdin.setRawMode(true);
  process.stdin.resume();

  return new Promise((resolve, reject) => {
    let value = '';
    const onData = (chunk) => {
      for (const byte of chunk) {
        if (byte === 3) {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          reject(new Error('cancelado'));
          return;
        }
        if (byte === 13 || byte === 10) {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(value.trim());
          return;
        }
        if (byte === 127 || byte === 8) value = value.slice(0, -1);
        else value += String.fromCharCode(byte);
      }
    };
    process.stdin.on('data', onData);
  });
}

try {
  if (showFamilySeed) {
    console.warn('ATENÇÃO: a family seed controla os fundos. Use somente em computador confiável.');
  }

  const phrase = await readSecret();
  const normalized = phrase.toLowerCase().split(/\s+/u).join(' ');
  const entropy = mnemonicToEntropy(normalized, english);
  const familySeed = rippleKeypairs.generateSeed({
    entropy: Uint8Array.from(entropy),
    algorithm: 'ed25519',
  });
  const keypair = rippleKeypairs.deriveKeypair(familySeed);
  const address = rippleKeypairs.deriveAddress(keypair.publicKey);

  console.log(`Endereço derivado: ${address}`);
  if (target) {
    console.log(`Endereço informado: ${target}`);
    console.log(`Coincide: ${address === target ? 'SIM' : 'NÃO'}`);
  }

  if (showFamilySeed) {
    console.log(`Family seed XRPL: ${familySeed}`);
    console.warn('Apague esta saída e não a publique, envie por chat ou cole em sites.');
  }
} catch (error) {
  console.error(`Erro: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
