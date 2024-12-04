export default class Contacts {
    constructor() {
      this.data = [];
    }
  
    get = () => {
      // A diferencia de Mongo, acceder a un arreglo sólo implica
      // retornar dicho arreglo, sin embargo, lo abstraemos con
      // el nombre "get" para que sea idéntico al DAO de mongo
      return this.data;
    }

    create = (contact) => {
        this.data.push(contact);
        return contact;
    }

    update = (id, contact) => {
        const index = this.data.findIndex(c => c.id === id);
        if (index === -1) return null;
        this.data[index] = { ...this.data[index], ...contact };
        return this.data[index];
      }

    delete = (id) => {
        const index = this.data.findIndex(c => c.id === id);
        if (index === -1) return null;
        return this.data.splice(index, 1)[0];
    }
  
}