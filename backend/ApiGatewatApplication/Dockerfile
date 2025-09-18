FROM openjdk:21

WORKDIR /app

COPY target/ApiGatewayApplication-0.0.1-SNAPSHOT.jar /app/api.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/api.jar"]