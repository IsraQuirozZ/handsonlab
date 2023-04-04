//  Registrador de tickets de eventos
// Definir la clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
// La clase debe contar con una variable privada “gain”, que será la ganancia de un ticket (15%)
// Debe contar con el método “getEvents” que mostrará los eventos guardados.
// Debe contar con el método “addEvent” que recibirá los siguientes parámetros:
// name
// place
// price (al cual hay que agregarle la ganancia adicional)
// capacity (si no se da: 50 por defecto)
// date (si no se da: hoy por defecto)
// El método deberá crear además el campo id autoincrementable y el campo “participants” que siempre iniciará con un arreglo vacío.

class TicketManager {
  #gain;
  constructor() {
    this.events = [];
    this.#gain = 0.15;
  }

  getEvents() {
    console.log(this.events);
    return this.events;
  }

  addEvent({ name, place, price, capacity, date }) {
    capacity = capacity ?? 50;
    date = date ?? new Date();
    let id;
    if (this.events.length === 0) {
      id = 1;
    } else {
      // Buscar último producto del array
      let lastEvent = this.events[this.events.length - 1];
      // Hallar la clave id de ese elemento
      // A ese id sumarle 1
      id = lastEvent.id + 1;
    }
    price = price + this.#gain * price;
    let event = { name, place, price, capacity, date, id, participants: [] };
    this.events.push(event);
  }
}

let ticket = new TicketManager();

ticket.addEvent({
  name: "Rey León",
  place: "Madrid",
  price: 10,
  capacity: 1000,
  date: new Date("05/20/2023"),
});

ticket.addEvent({
  name: "HP",
  place: "London",
  price: 15,
  capacity: null,
  date: new Date("10/20/2023"),
});

ticket.addEvent({
  name: "Mamamia",
  place: "México",
  price: 15,
  capacity: 1000,
  date: undefined,
});

ticket.addEvent({
  name: "Disney on Ice",
  place: "México",
  price: 20,
});

ticket.getEvents();
