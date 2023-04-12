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

  getEventById(eventId) {
    let foundedEvent = this.events.find((event) => event.id === eventId);
    if (foundedEvent) {
      console.log(foundedEvent);
      return foundedEvent;
    } else {
      console.log("Not founded");
      return null;
    }
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

  addParticipant(eventId, userId, newName) {
    let foundedEvent = this.getEventById(eventId);
    if (foundedEvent) {
      if (foundedEvent.capacity > foundedEvent.participants.length) {
        let user = foundedEvent.participants.includes(userId);
        if (user) {
          console.log(`Ya se encuentra en la lista el usuario: ${userId}`);
        } else {
          console.log("Agregado usuario:" + userId);
          foundedEvent.participants.push(userId);
          // return userId;
        }
      } else {
        console.log("No hay más capacidad");
      }
    }
    // if (newName) {
    //   foundedEvent.name = newName;
    // }
    return null;
  }

  editEvent(eventId, data) {
    let foundedEvent = this.getEventById(eventId);
    for (let property in data) {
      foundedEvent[property] = data[property];
    }
  }

  addNewEvent(eventId, newPlace, newDate) {
    let searchedEvent = { ...this.getEventById(eventId) };
    this.addEvent({
      name: searchedEvent.name,
      place: newPlace,
      price: searchedEvent.price,
      capacity: searchedEvent.capacity,
      date: newDate,
    });
    console.log("Se creó el nuevo evento");
  }

  deleteEvent(eventId) {
    let foundedEvent = this.getEventById(eventId);
    this.events = this.events.filter((event) => event.id !== eventId);
    console.log(`Evento: "${foundedEvent.name}" eliminado`);
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

// ticket.getEvents();
// ticket.getEventById(9);
// ticket.addParticipant(1, 5);
// ticket.addParticipant(1, 5);
// ticket.getEventById(1);
// ticket.addParticipant(3, 5);
// ticket.addNewEvent(3, "Madrid", new Date("08/20/2023"));
// ticket.deleteEvent(3);
// ticket.editEvent(1, { name: "Isra" });
ticket.getEvents();
