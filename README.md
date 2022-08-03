<h2 align="center">Arverse: Validator Node for Avalanche Blockchain</h2>

<p align="center">
<a href="https://github.com/smol-ninja/arverse.gg/actions/workflows/deploy.yml"><img alt="Github Actions Build Status" src="https://img.shields.io/github/workflow/status/smol-ninja/arverse.gg/Prod?label=Build&style=flat-square"></a>
<a href="https://nextjs.org/"><img alt="Next JS" src="https://img.shields.io/badge/next-v12.2.3-blue?style=flat-square"></a>
<a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/typescript-v4.7.2-blue?style=flat-square"></a>
<a href="https://tailwindcss.com/"><img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-v3.1.2-blue?style=flat-square"></a>
<a href="https://github.com/prettier/prettier"><img alt="Prettier style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

<p align="center">
<a href="https://arverse.gg">Live version - Arverse.gg</a>
<p>

### To start development

###### Installing dependencies

```bash
yarn install
```

###### Add environment variables in .env.local file

```bash
NEXT_PUBLIC_ARVERSE_URL=Website_URL
CMC_API_KEY=CoinMarketCap_API_KEY_here
RPC_ENDPOINT=RPC_Endpoint_here
NEXT_PUBLIC_NODE_ID=NEXT_PUBLIC_NODE_ID_for_RPC_API
CMC_ENDPOINT=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
```

###### Running locally on Port 3000

```bash
yarn dev
```

### Docker deployment

###### Build docker image

```bash
docker-compose build
```

###### Run docker container on Port 8000

```bash
docker-compose up
```

### Production deployment

Auto deployment is enabled via Github workflow.
