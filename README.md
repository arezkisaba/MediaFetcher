## Getting Started

```
# list all docker containers
docker ps -a

# browse container filesystem
docker exec -it <containerid> bash

# stop and remove a container + purge all
docker stop <containerid>;docker rm <containerid>;docker system prune -a

# get logs for a container
docker logs <containerid>

# start a docker compose instance
docker compose up
```

```
# ChatGPT customization
I'm a Typescript/Javascript/C# Developer
I'm using Linux first, and Windows next
When you give me code snippets, please use 4 spaces tabs
For conditional structures and loops, use braces
```
