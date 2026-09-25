# XRP Community Wallet Recovery Tool

Ferramenta local para verificar frases BIP39 de carteiras XRP Community Wallet e derivar o endereço XRPL correspondente.

> **Importante:** este projeto nunca deve receber uma seed em um site ou serviço online. Execute-o localmente, de preferência em um computador confiável e sem extensões de navegador desnecessárias.

## O que o projeto faz

A derivação usada pela carteira é:

```text
BIP39 mnemonic
→ BIP39 entropy
→ ripple-keypairs.generateSeed({ algorithm: "ed25519" })
→ XRPL family seed
→ XRPL address
```

O programa não consulta a blockchain e não envia a seed para a internet. Ele apenas deriva o endereço localmente.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
```

## Verificar um endereço

Passe somente o endereço público como argumento:

```bash
node recover.mjs rNZEEDSuGcUYy2y2D2YX7L1Enp4RCY8GJo
```

O programa solicitará a seed sem exibi-la no terminal. O resultado esperado será semelhante a:

```text
Endereço derivado: r...
Endereço informado: r...
Coincide: SIM
```

Não passe a seed como argumento: isso pode deixá-la registrada no histórico do shell ou visível na lista de processos.

## Mostrar a family seed

Só use esta opção se você precisa importar a conta em uma carteira XRPL que aceite uma family seed:

```bash
node recover.mjs rNZEEDSuGcUYy2y2D2YX7L1Enp4RCY8GJo --show-family-seed
```

A family seed controla os fundos. Não a publique, não a envie por chat e não a cole em websites. Se o endereço não coincidir, não use a family seed.

## Segurança

- O código não contém telemetria, servidor ou API de recuperação.
- Nunca peça a seed de outra pessoa.
- Nunca armazene seeds em issues, pull requests, logs ou arquivos do repositório.
- Verifique o endereço derivado antes de assinar qualquer transação.
- Faça primeiro uma transferência pequena para uma carteira nova.
- Prefira transferir para uma carteira de hardware recém-inicializada.
- O repositório não assina nem transmite transações automaticamente.

## Publicação no GitHub

Antes de publicar, confira:

```bash
git status --short
git grep -n -i "seed\|family seed\|mnemonic" -- ':!README.md' ':!recover.mjs'
```

Nunca inclua uma seed real nos arquivos, testes, commits ou exemplos.

## Licença

MIT
