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
    data.id = 1;
    this.users.push(data);
    let dataJson = JSON.stringify(this.users, null, 2);
    fs.promises
      .writeFile(this.path, dataJson)
      .then((res) => console.log("user created"))
      .catch((err) => console.log(err));
  }

  // getUsers() {}
  // getUserId(id){}
  // updateUser(id, data){}
  // deleteUser(id){}
}

let manager = new UserManager("./data/users.json");
manager.addUser({ name: "Isra", lastName: "Quiroz", age: 22, carts: [] });
manager.addUser({ name: "Karen", lastName: "Guzmán", age: 21, carts: [] });
