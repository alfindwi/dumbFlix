FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy all project files into container
COPY . .

# Build the jar file
RUN mvn clean package -DskipTests

# Rename the jar to app.jar (assuming only one jar is produced)
RUN cp target/*SNAPSHOT.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
