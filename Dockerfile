FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

ARG JAR_FILE=money-observer.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]