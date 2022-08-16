cp .env.example .env.local
echo "\nCMC_API_KEY=$1" >> .env.local # replace $123 with your Coinmarketcap API key
echo "API_ENDPOINT=https://vscout.io" >> .env.local # replace $123 with your API endpoint to fetch node data