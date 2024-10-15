FROM amazoncorretto:17

ARG JAR_FILE=build/libs/coduo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /coduo-app.jar

ARG PROFILE
ENV PROFILE_ENV=${PROFILE}
ENV SERVER_PORT=8080
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=${PROFILE_ENV} -Dserver.port=${SERVER_PORT} /coduo-app.jar"]
