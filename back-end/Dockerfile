# ─── Estágio 1: Build com Maven ─────────────────────────────────────
FROM eclipse-temurin:21-jdk AS builder

RUN apt-get update && apt-get install -y maven

WORKDIR /app

COPY pom.xml .
COPY src src

RUN mvn package -DskipTests

# ─── Estágio 2: Rodar a aplicação ───────────────────────────────────
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]