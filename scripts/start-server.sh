
#!/bin/bash

echo "--------------- 서버 배포 시작 -----------------"
docker stop hamtalk-server || true
docker rm hamtalk-server || true
docker pull 235494776530.dkr.ecr.ap-northeast-2.amazonaws.com/hamtalk-server/hamtalk-server:latest
docker run -d --name hamtalk-server -p 8080:8080 235494776530.dkr.ecr.ap-northeast-2.amazonaws.com/hamtalk-server/hamtalk-server:latest
echo "--------------- 서버 배포 끝 -----------------"