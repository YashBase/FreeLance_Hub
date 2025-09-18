FROM openjdk:21

WORKDIR /app

COPY target/ClientService-0.0.1-SNAPSHOT.jar /app/client.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","/app/client.jar"]