<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="imageReadme/gallery.png" alt="Gallery"></a>
</p>

<h3 align="center">Gallery Photo</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.

    <br> 

</p>

## 📝 Table of Contents

* [About](#about)
* [Getting Started](#getting_started)
* [Deployment](#deployment)
* [Usage](#usage)
* [Built Using](#built_using)
* [TODO](../TODO.md)
* [Contributing](../CONTRIBUTING.md)
* [Authors](#authors)
* [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This project is carried out as a technical test, with the purpose of participating in one of the vacancies as a backend developer in the company Condorlab.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

to use this software you need

1. install nodejs and npm latest version, Download here [nodejs](https://nodejs.org/es/).

2. Install mongo db community latest version, Download here [mongodb](https://nodejs.org/es/).

3. add mongodb environment variables

``` 
C:\Program Files\MongoDB\Server\4.0\bin
```

4. install postman sister to test with apis, Download here [postman](https://www.postman.com/)

### Installing

A step by step series of examples that tell you how to get a development env running.

run the project

1. download or clone the project.
2. install the libraries, dependencies and packages so that the project can work.

``` 
npm install
```

3. update libraries.

``` 
npm update
```

4. open command prompt.
5. go to project location.
6. run project

``` 
npm start
```

start the project in developer mode

``` 
nodemon developer
```

## 🎈 Usage <a name="usage"></a>

How to use the system.

## User method
the route depends on the free port on the server or if it is local by default you will use this route with the port 3000
1. path to register a new user and receive the following parameters: username, surname, email, password.
``` 
http://localhost:3000/api/register
```
2. path to login the user and receive the following parameters: email, password.
``` 
http://localhost:3000/api/login
```

upon logging in he receives a token that they must see adding a parameter called gettoken and as a value: true this token will serve them to be able to update edit, among other things since it is a JWT key
<p align="left">
  <a href="">
 <img width=500px height=25px src="imageReadme/gettoken.JPG" alt="GetToken"></a>
</p>

3. path to update user and receive the following parameters: username, surname, email, password.
``` 
http://localhost:3000/api/update
```
3. path to upload avatar
``` 
http://localhost:3000/api/upload-avatar
```

4. pshow the avatar image by the name saved in the database
``` 
http://localhost:3000/api/avatar/:fileName
```

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

* [MongoDB](https://www.mongodb.com/) - Database
* [Express](https://expressjs.com/) - Server Framework
* [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

* [@luisfor](https://github.com/luisfor) - Luis Canedo

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

* Hat tip to anyone whose code was used

  1. [victor Robles](https://victorroblesweb.es/2018/01/31/configurar-acceso-cors-en-nodejs/)

  

  2. [Fazt](https://www.faztweb.com/curso/nodejs)

  3. [Kevin Mendez](https://medium.com/@deskevinmendez/login-y-register-con-nodejs-express-jwt-y-mongodb-ff329ed25a3f)

  

* proposal given by the company

  [CondorLABS](https://condorlabs.io/)
