# Getting Started

```bash
mkdir api-torrentsearch
cd api-torrentsearch
npm init -y
npm install express typescript ts-node node-fetch xml2js tsyringe reflect-metadata cors
npm install @types/express @types/xml2js @types/node @types/cors --save-dev
npx tsc --init
mkdir src
touch src/index.ts src/app.ts src/routes.ts
```