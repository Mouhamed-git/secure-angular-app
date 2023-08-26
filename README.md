# Secure Angular App

## This repository shows how to automate deployment and security testing like SCA, SAST and DAST with Angular App using GitHub Actions.

![My Image](/src/assets/images/ssdlc.png)

** 🔵 Project Architecture 🔵 **

![My Image](/src/assets/images/devsecops.jpg)

Angular Project

```bash
  ├── Dockerfile
├── README.md
├── angular.json
├── karma.conf.js
├── nginx.conf
├── package-lock.json
├── package.json
├── sonar-project.properties
├── .dockerignore
├── .gitignore
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── layouts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   └── footer.component.ts
│   │   │   └── header
│   │   │       ├── header.component.html
│   │   │       ├── header.component.scss
│   │   │       └── header.component.ts
│   │   ├── routes
│   │   │   ├── home
│   │   │   │   ├── home-routing.module.ts
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.ts
│   │   │   │   └── home.module.ts
│   │   │   └── login
│   │   │       ├── login-routing.module.ts
│   │   │       ├── login.component.html
│   │   │       ├── login.component.scss
│   │   │       ├── login.component.ts
│   │   │       └── login.module.ts
│   │   ├── services
│   │   │   ├── auth.service.ts
│   │   │   ├── personnel.service.ts
│   │   │   └── transaction.service.ts
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   ├── outflow
│   │   │   │   │   ├── outflow.component.html
│   │   │   │   │   ├── outflow.component.scss
│   │   │   │   │   ├── outflow.component.ts
│   │   │   │   │   └── outflow.module.ts
│   │   │   │   └── payment
│   │   │   │       ├── payment.component.html
│   │   │   │       ├── payment.component.scss
│   │   │   │       ├── payment.component.ts
│   │   │   │       └── payment.module.ts
│   │   │   ├── enums
│   │   │   │   ├── decaissement-type.enums.ts
│   │   │   │   ├── mounth.enums.ts
│   │   │   │   └── transaction-type.enums.ts
│   │   │   └── models
│   │   │       ├── auth.model.ts
│   │   │       ├── decaissement.model.ts
│   │   │       ├── payment.model.ts
│   │   │       ├── personnel.model.ts
│   │   │       └── transaction.model.ts
│   │   └── utils
│   │       ├── date.utils.ts
│   │       └── form-validator-utils.ts
│   ├── assets
│   │   ├── scss
│   │   │   └── custom-styles.scss
│   │   └── images
│   │       └── cover.jpg
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

** 🔵 Dockerize Application 🔵 **

1. Dockerfile configuration

```dockerfile
FROM node:16-alpine AS node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=node /usr/src/app/dist/secure-angular-app /usr/share/nginx/html

EXPOSE 80

```

2. Nginx configuration 

```nginx configuration
worker_processes auto;
error_log  /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    sendfile on ;
    include /etc/nginx/mime.types;
    server {
        listen 80;     
        listen [::]:80; 
        root /usr/share/nginx/html;
        index index.html;
        location / {
               try_files $uri $uri/ /index.html;
        }
    }
}
```

3. dockerignore file

```text
# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db
.angular/*
```

** 🔵 Workflow configuration 🔵 **

1. Workflow CI (angular-ci)

```yaml
name: Secure Angular App CI

on:
  push:
    branches:
    - '**'

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./

    steps:
    - name: Check out the repository
      uses: actions/checkout@v3
      with:
        fetch-depth: 0

    - name: Install NodeJs
      uses: actions/setup-node@v3
      with:
        node-version: 16
        cache: 'npm'
        cache-dependency-path: './package-lock.json'

    - name: Install dependencies
      run: npm ci

    - name: Run SCA with Npm Audit
      run: |
         npm audit --json > npm-audit.json || true
         npx npm-audit-html -i npm-audit.json

    - name: Archive audit report
      uses: actions/upload-artifact@v3
      with:
        name: npm-audit-report
        path: ./npm-audit.html

    - name: Run SAST with Sonarqube
      uses: sonarsource/sonarqube-scan-action@master
      env:
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
      with:
        projectBaseDir: ./
      # If you wish to fail your job when the Quality Gate is red, uncomment the
      # following lines. This would typically be used to fail a deployment.
      # - uses: sonarsource/sonarqube-quality-gate-action@master
      #   timeout-minutes: 5
      #   env:
      #    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

6. Workflow CD (angular-d)

```yaml 

name: Secure Angular App CD

on:
  pull_request:
    branches:
      - master
    types:
      - closed

jobs:
  deploy:

    if: github.event.pull_request.merged == true

    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./

    steps:
    - name: Check out the repository
      uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        file: ./Dockerfile
        push: true
        tags: miisteuhdiack/secure-angular-app:preprod

    - name: Deploy App
      uses: appleboy/ssh-action@v0.1.10
      with:
        host: ${{ secrets.SSH_HOST }}
        username: ${{ secrets.SSH_USER }}
        key: ${{ secrets.SSH_KEY }}
        script:  |
          docker stop miisteuhdiack/secure-angular-app:preprod || true
          docker rm -f secure-angular-app
          docker pull miisteuhdiack/secure-angular-app:preprod
          docker run --name secure-angular-app -p 80:80 -d miisteuhdiack/secure-angular-app:preprod

  dast:
    needs: deploy

    runs-on: ubuntu-latest

    steps:
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Run DAST with Zap
      run: |
        docker run --name zap -t ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py -t http://51.83.71.17 || true
```


##### Thank you ! 🤗

*Follow me:*
* LinkedIn: https://www.linkedin.com/in/mouhamad-diack-b0b1541a3/
* Discord: https://discord.com/users/845331863018274836
* medium: https://medium.com/@rootsn221/spring-boot-postgresql-excel-84ea2b61ccfa
* Portfolio: https://md-portfolio.carrd.co/
