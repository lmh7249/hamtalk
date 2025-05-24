FROM openjdk:17-jdk

# 타임존 설정
ENV TZ=Asia/Seoul

COPY build/libs/*SNAPSHOT.jar project.jar

ENTRYPOINT ["java", "-jar", "/project.jar"]