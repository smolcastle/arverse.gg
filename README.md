<h2 align="center">Beetroot: Validator Node for Avalanche Blockchain</h2>

<p align="center">
<a href="https://github.com/smol-ninja/arverse.gg/actions/workflows/deploy.yml"><img alt="Github Actions Build Status" src="https://github.com/smol-ninja/arverse.gg/actions/workflows/deploy.yml/badge.svg"></a>
<a href="https://nextjs.org/"><img alt="Next JS" src="https://img.shields.io/badge/next-v12.2.3-blue?style=flat-square"></a>
<a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/typescript-v4.7.2-blue?style=flat-square"></a>
<a href="https://tailwindcss.com/"><img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-v3.1.2-blue?style=flat-square"></a>
<a href="https://github.com/prettier/prettier"><img alt="Prettier style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

<p align="center">
<a href="https://beetroot.ai">Live version - Beetroot.ai</a>
<p>

### To start development

###### Installing dependencies

```bash
yarn install
```

Requirements:

1. `CMC_API_KEY=` Coinmarketcap API key to fetch AVAX price

###### Run setup

```bash
./setup.sh YOUR_CMC_API_KEY
```

###### Running locally on Port 3000

```bash
yarn dev
```

### Docker deployment

###### Build docker image. Add your CMC_API_KEY to docker-compose.yml

```bash
docker-compose build --build-arg CMC_API_KEY="{YOUR_CMC_API_KEY}"
```

###### Run docker container on Port 8000

```bash
docker-compose up
```

### Production deployment

Auto deployment is enabled via Github workflow.

### License

(c) Beetroot.ai, 2022 - [All rights reserved](LICENSE).
