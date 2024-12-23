
if [ ! -f .env ] && [ -f .env.example ] ; then
    cp .env.example .env
fi

if [ ! -d node_modules ] && [ -f package.json ] ; then
    echo "Running: npm install"
    npm install
fi

# tail -f /dev/null

npm run test

npm run dev


