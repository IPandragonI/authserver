FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:21-jdk
ARG JAR_FILE=/workspace/target/*.jar
COPY --from=build ${JAR_FILE} /app.jar
WORKDIR /
ENV SERVER_PORT=3000
EXPOSE 3000
ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app.jar"]
