# iHelp

## Development
###How to install and run the project locally

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle. For this project pe use Node version 16.13.1 and NPM version 8.8.0.
2. [Docker](https://hub.docker.com/): We use Docker to deploy our aplication. You can work locally by downloading this project,
   but you'll still need DockerHub to manage both the database(PostgreSQL) and the authentification service (Keycloak).  For this project pe use Docker version 20.10.8
3. [IntelliJ IDEA](https://www.jetbrains.com/idea/): This is our chosen work IDE. You can use any IDE you like.
4. [Java 11.00](https://www.java.com) or higher.

After installing, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Webpack] as our build system.

In development mode, you'll have to manually start your dockers by running the following commands in two separate terminals:
```
docker-compose -f src/main/docker/keycloack.yml up
docker-compose -f src/main/docker/postgresql.yml up
```
The first command fill start the environment for your database, the second one will start the environment for the 3rd party authentication service.

Run the following commands in two separate terminals to create a development experience where your browser
auto-refreshes when files change on your hard drive. (first command starts the backend, second commands starts the frontend)

Linux:

```
./mvnw
npm start
```

Windows:

```
mvnw
npm start
```

The `npm run` command will list all the scripts available to run for this project.

## Production
### Building for production

### Packaging as jar

To build the final jar and optimize the ihelp application for production, run:

```
./mvnw -Pprod clean verify
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar target/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./mvnw -Pprod,war clean verify
```

## Using Docker
For example, to start a postgresql database in a docker container, run:

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/postgresql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./mvnw -Pprod verify jib:dockerBuild
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```


## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

## RabbitMQ
TODO

##Logging - Grafana
TODO


## Continuous Integration

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 7.3.1 archive]: https://www.jhipster.tech/documentation-archive/v7.3.1
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v7.3.1/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v7.3.1/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v7.3.1/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v7.3.1/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v7.3.1/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v7.3.1/setting-up-ci/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[webpack]: https://webpack.github.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
