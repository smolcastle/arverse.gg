cp .env.example .env.local
echo "\nCMC_API_KEY=$1" >> .env.local
mkdir data && echo '{}' > data/avax.json