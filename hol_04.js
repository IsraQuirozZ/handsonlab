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
      this.users = JSON.parse(fs.readFileSync(path, "utf-8"));
      return "Data recovered";
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

  getUsers(quantity) {
    quantity = quantity ?? 5;
    let sliceUser = this.users.slice(0, quantity);
    console.log(sliceUser);
    return sliceUser;
  }

  getUserById(id) {
    let foundUser = this.users.find((user) => user.id === id);
    if (foundUser) {
      console.log(foundUser);
      return foundUser;
    } else {
      console.log(`- No se encontró un usuario con el id ${id}`);
      return null;
    }
  }

  updateUser(id, data) {
    let foundUser = this.getUserById(id);

    if (!foundUser) {
      console.log("error: not found user to update");
      return "error: not found user to update";
    }
    if (Object.keys(data).length === 0) {
      console.log("error: insert some values");
      return "error: insert some values";
    }
    for (let prop in data) {
      //Verificar que la propiedad pertenece al objeto (propiedad que exista)
      if (
        prop !== "name" ||
        prop !== "lastName" ||
        prop !== "age" ||
        prop !== "carts"
      ) {
        console.log(`error: "${prop}" is not a property of user`);
        return `error: "${prop}" is not a property of user`;
      }
      foundUser[prop] = data[prop];
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

  deleteUser(id) {
    let foundUser = this.getUserById(id);
    if (foundUser) {
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
      console.log(`Usuario: "${foundUser.name}" eliminado`);
    }
  }
}

let manager = new UserManager("./data/users.json");
// manager.addUser({ name: "Isra", lastName: "Quiroz", age: 22, carts: [] });
// manager.addUser({ name: "Karen", lastName: "Guzmán", age: 21, carts: [] });
// manager.addUser({ name: "Kike", lastName: "Ozuna", age: 21, carts: [] });

manager.getUsers();
manager.getUserById(3);
manager.updateUser(1, { nombre: "Israel" });
manager.deleteUser(3);
manager.deleteUser(4);

// Al ejecutarse el programa devolverá por consola:
// Todos los usuarios (3)
// El usuario con el Id (3)
// En el archivo "users.json" se modificará el usuario con el id 1
// En el archivo "users.json" se eliminará el usuario con id 3
// En consola mostrará un error de que no existe el usuario con el id 4
