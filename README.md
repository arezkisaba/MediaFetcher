## Getting Started

```
# list all docker containers
docker ps -a

# stop and remove a container + purge all
docker stop <containerid>;docker rm <containerid>;docker system prune -a

# get logs for a container
docker logs <containerid>

# start a docker compose instance
docker compose up
```
