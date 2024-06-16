This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## usefull commands

```
# list all docker containers
docker ps -a

# purge all
docker system prune -a

# stop and remove a container
docker stop <containerid>;docker rm <containerid>

# build a container from a Dockerfile
docker build -t arezkisaba/torrentapi .
docker run -p 8888:3000 -e NODE_ENV=development -v /media/Babylon/.TorrentApi:/app/data -d arezkisaba/torrentapi

docker run -e NODE_ENV=development -e MEDIA_PATH=/media/Babylon/.TorrentApi2 -d arezkisaba/torrentapi


# get logs for a container
docker logs <containerid>

# start a docker compose instance
docker compose up --build -e MEDIA_PATH=/media/Babylon/.TorrentApi2
```



# Ideas

random estimation