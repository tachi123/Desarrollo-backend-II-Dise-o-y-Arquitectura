import ContactDTO from "../dao/DTOs/contact.dto.js";

export default class ContactRepository {

    constructor(dao) {
      // Nota cómo recibiremos el Dao a utilizar
      // La intención de este Repository sólo es mandar
      // A llamar los métodos del Dao.
      this.dao = dao;
    }
  
    // Abstraemos los métodos para acceder al dao, por ejemplo
  
    // con su método get
    getContacts = async () => {
      let result = await this.dao.get();
      return result;
  
    }
  
    createContact = async (contact) => {
      let contactToInsert = new ContactDTO(contact);
      let result = await this.dao.create(contactToInsert);
      return result;
    }

    // ... otros métodos del repositorio
  
  }