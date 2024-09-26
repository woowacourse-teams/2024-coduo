FROM amazoncorretto:17

ARG JAR_FILE=build/libs/coduo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /coduo-app.jar

ARG PROFILE
ENV PROFILE_ENV=${PROFILE}
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${PROFILE_ENV}", "/coduo-app.jar"]
