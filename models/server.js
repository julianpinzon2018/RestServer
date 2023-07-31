const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conectar a base de datos
    this.conectacrDB();

    // Middlewares
    this.midddlewares();

    // Rutas de mi app
    this.routes();
  }

  async conectacrDB() {
    await dbConnection();
  }

  midddlewares() {
    // Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user.js"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.clear();
      console.log(`Server is running on ${this.port}`);
    });
  }
}

module.exports = Server;
