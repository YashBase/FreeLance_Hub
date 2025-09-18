FROM openjdk:21

WORKDIR /app

COPY target/VendorService-0.0.1-SNAPSHOT.jar /app/vendor.jar

EXPOSE 8083

ENTRYPOINT ["java","-jar","/app/vendor.jar"]