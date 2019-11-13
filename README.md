# OnlineShop-NodeJS
---

#### Quick start

Clone the repo:

```sh
 $ git clone https://github.com/Kleimionov-WebRuby/OnlineShop-NodeJS.git
```

Or [Download the latest release.](https://github.com/Kleimionov-WebRuby/OnlineShop-NodeJS/archive/master.zip)

#### Installation

---

##### Nodemon

First of all need to install `nodemon`

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm.

```sh
 $ npm install -g nodemon
```

Use the command below to verify that the installation was successful

```sh
 $ nodemon -v
```

---

##### Node.js

Application requires [Node.js](https://nodejs.org/) v4+ to run.

---

##### Database

Install the `sequelize cli` for support ORM command

```sh
$ npm install -g sequelize-cli
```

Install the dependencies and devDependencies.

```sh
$ cd OnlineShop-NodeJS
$ npm install -d
```

Create database to mysql with name: **"online-shop"**
Then use command for migrate the database

```sh
$ sequelize db:migrate
```

_Greate, your database created!_

---

To run application use

```sh
$ npm start
```
