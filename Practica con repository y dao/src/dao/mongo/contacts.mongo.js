import contactsModel from '../../models/contacts.model.js';

export default class Contacts {

    constructor() {}
  
    get = async () => {
      // Sabemos que find corresponde a Mongo
      // Sin embargo, lo abstraemos en un método
      // get para mantener el caracter intercambiable
      let contacts = await contactsModel.find();
      return contacts;
    }

    create = async (contact) => await contactsModel.create(contact);

    update = async (id, contact) => await contactsModel.findByIdAndUpdate(id, contact, { new: true });

    delete = async (id) => await contactsModel.findByIdAndDelete(id);
  }