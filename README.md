# iHelp

## Development
### How to install and run the project locally

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
Do note that if you haven't used keycloak locally before, you'll have to edit
your /etc/hosts file to contain
```
127.0.0.1 keycloak
 ```
as the server won't recognize your machine otherwise.

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
./mvnw.cmd
npm start
```

The `npm run` command will list all the scripts available to run for this project.

### Relevant documents
1. [User stories](documentation/User%20stories.md)
2. [Wireframes](wireframes/ihelp.fig)
3. [Mockups](wireframes/mockup.pdf)
4. [Document cu arhitectura macro (la nivel de sistem)](documentation/Document%20cu%20arhitectura%20macro.png)
5. [Document cu arhitectura de domeniu (la nivel de date)](documentation/Document%20cu%20arhitectura%20macro.png)
6. [Codul sursa](src)
7. [Fisierele YAML de configuratie infrastructura](src/main/resources/config/application-dev.yml)

We've been using a combination of JIRA/Google Docs to track our progress: 
[JIRA Board](https://pweb-stop-war.atlassian.net/jira/software/projects/PWEB/boards/1)

## Contact

Andra Vasilache - [AndraVasilache](https://github.com/AndraVasilache) - [vasilacheandragabriela@gmail.com]()

Radu Durbalau - [radurbalau](https://github.com/radurbalau)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

Distributed under the MIT License. See `LICENSE` for more information.

