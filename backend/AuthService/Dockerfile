FROM openjdk:21

WORKDIR /app

COPY target/AuthService-0.0.1-SNAPSHOT.jar /app/auth.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","/app/auth.jar"]