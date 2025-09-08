FROM eclipse-temurin:21-jdk

ENV VERSION="1.0.0"

RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app

WORKDIR /app

COPY pom.xml /app

COPY src /app/src

RUN mvn clean package -DskipTests

EXPOSE 3000

CMD mvn spring-boot:run