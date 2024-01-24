FROM openjdk:17
WORKDIR /app
COPY target/Spring-Ecommerce-App-Backend-0.0.1-SNAPSHOT.jar /app/Spring-Ecommerce-App-Backend-0.0.1-SNAPSHOT.jar
EXPOSE 1235
CMD ["java", "-jar", "/app/Spring-Ecommerce-App-Backend-0.0.1-SNAPSHOT.jar"]



