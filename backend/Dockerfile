FROM amazoncorretto:17
ARG JAR_FILE=build/libs/coduo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /coduo-app.jar
ENTRYPOINT ["java", "-jar", "/coduo-app.jar"]
