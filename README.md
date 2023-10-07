# Ticketing 🎫

> This is an application [Stub Hub](https://www.stubhub.com/) like. The purpose here is to study microservices applications based.

## Developed Features

### Backend services

#### Auth
- [x] Environment config:
  - [x] Configure MongoDB;
  - [x] Create services deployment files;
  - [x] Configure skaffold to run k8s containers;
  - [x] Configure NGINX ingress controller;
- [x] Authentication service:
  - [x] Generate JWT;
  - [x] Inject JWT as cookie session;
  - [x] Configure secrets services in k8;
  - [x] Sign up flow;
  - [x] Sign in flow;
  - [x] Sign out flow;
  - [x] Get current user;
---
### 💻 Prerequisites

Before you begin, make sure you've met the following requirements:

* [NodeJs v10.x+](https://nodejs.org/en);
* [Docker](https://www.docker.com/get-started/)
* [K8s](https://kubernetes.io/)
* [Skaffold](https://skaffold.dev/)
* [Ingress Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)


### 📦 Preparing environment

To run the application, follow these steps:

Download the project and install the dependencies:

```bash
# Clone this repo
git clone https://github.com/Chriszao/ticketing.git

# Enter the project folder
cd ticketing

# Install deps 
# P.S: You can use the package manager of your choice. 
# but this project were developed with npm, and works better with it
npm install # inside of each service folder

# Inside each service have a “start” script that does start the service server
npm run start # <inside of service>

# At the moment, you can use the insomnia collection to make requests to the service
```

This application uses NGINX ingress controller as a proxy, so to make local requests, you have to add the following config inside your `/etc/hosts`

```bash
# ...
# This will forward every request received in localhost to the NGINX ingress controller.
127.0.0.1 ticketing.dev

# And install Ingress NGNIX Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Remember to create the secret pod to load the env variables with the following command: 
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=value_of_the_secret

```
<!-- 
### ☕ Using the Application

You can start all the services servers and use the web client to create posts, and comments. If you put down the query service, and create posts or comments, the event bus will store the events to when the query service come up again, it will automatically sync the events. -->

---
### 🛠️ Technologies
- [Typescript](https://www.typescriptlang.org/docs/);
- [NodeJs](https://nodejs.org/en);
- [Express](https://expressjs.com/);
- [Skaffold](https://skaffold.dev/);
- [K8s](https://kubernetes.io/);
- [MongoDB](https://www.mongodb.com/);

<p align="center">
  Developed with 💙 by <strong>Chriszao</strong>
</p>
