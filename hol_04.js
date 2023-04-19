const fs = require("fs");
// El Manager debe vivir en una clase en un archivo externo lamado UserManager.js
class UserManager {
  constructor(path) {
    this.users = []; // Users va a alojar todos los usuarios
    this.path = path; // Path es el parámetro con la ruta donde debe crearse el archivo donde se guardaran los usuarios
    this.init(path);
  }

  init(path) {
    // Método que al definirse una instancia de la clase: VA a crear el archivo
    let file = fs.existsSync(path);
    if (!file) {
      fs.promises
        .writeFile(path, "[]")
        .then((res) => console.log("File created"))
        .catch((err) => console.log(err));
    } else {
      // fs.promises
      //   .readFile(path, "UTF-8")
      //   .then((res) => (this.users = JSON.parse(res)))
      //   .catch((err) => console.log(err));
      let contenido = fs.readFileSync(path, "utf-8");
      this.users = JSON.parse(contenido);
    }
  }

  addUser({ name, lastName, age, carts }) {
    let data = { name, lastName, age, carts };
    let id;
    if (!this.users.length) {
      id = 1;
    } else {
      let lastUser = this.users[this.users.length - 1];
      id = lastUser.id + 1;
    }
    data.id = id;
    this.users.push(data);
    let dataJson = JSON.stringify(this.users, null, 2);
    fs.promises
      .writeFile(this.path, dataJson)
      .then((res) => console.log("user created"))
      .catch((err) => console.log(err));
  }

  getUsers() {
    console.log(this.users);
    return this.users;
  }

  getUserById(id) {
    let foundedUser = this.users.find((user) => user.id === id);
    if (foundedUser) {
      console.log(foundedUser);
      return foundedUser;
    } else {
      console.log(`- No se encontró un usuario con el id ${id}`);
      return null;
    }
  }

  updateUser(id, data) {
    let foundedUser = this.getUserById(id);
    if (foundedUser) {
      for (let property in data) {
        foundedUser[property] = data[property];
      }
      // BORRA EL ARCHIVO
      fs.promises
        .unlink(this.path)
        .then((res) => console.log("Se elimino el archivo"))
        .catch((err) => console.log("Ocurrió un error"));
      // LO VOLVEMOS A CREAR CON LA INFO ACTUALIZADA
      let dataJson = JSON.stringify(this.users, null, 2);
      fs.promises
        .writeFile(this.path, dataJson)
        .then((res) => console.log("Archivo actualizado"))
        .catch((err) => console.log(err));
    }
  }

  deleteUser(id) {
    let foundedUser = this.getUserById(id);
    if (foundedUser) {
      let newUsers = this.users.filter((user) => user.id !== id);
      // BORRA EL ARCHIVO
      fs.promises
        .unlink(this.path)
        .then((res) => console.log("Se elimino el archivo"))
        .catch((err) => console.log("Ocurrió un error"));
      // LO VOLVEMOS A CREAR CON LA INFO ACTUALIZADA
      let dataJson = JSON.stringify(newUsers, null, 2);
      fs.promises
        .writeFile(this.path, dataJson)
        .then((res) => console.log("Archivo actualizado"))
        .catch((err) => console.log(err));
      console.log(`Usuario: "${foundedUser.name}" eliminado`);
    }
  }
}

let manager = new UserManager("./data/users.json");
// manager.addUser({ name: "Isra", lastName: "Quiroz", age: 22, carts: [] });
// manager.addUser({ name: "Karen", lastName: "Guzmán", age: 21, carts: [] });
// manager.addUser({ name: "Kike", lastName: "Ozuna", age: 21, carts: [] });

// manager.getUsers();
// manager.getUserById(1);
// manager.updateUser(1, { name: "Isra" });
manager.deleteUser(3);
