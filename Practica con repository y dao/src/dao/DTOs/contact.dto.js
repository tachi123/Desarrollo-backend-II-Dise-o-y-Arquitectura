export default class ContactDTO {

    constructor(contact) {
      // Tal vez el frontend te envió tu dato como "name"
      this.first_name = contact.name;
      this.last_name = contact.last_name;
      this.active = true; // Podemos utilizarlo también para setear nuevas cosas
      // Tal vez el frontend envió el teléfono con guiones o ni siquiera lo 
      // envió (podría ser un campo opcional)
      this.phone = contact.phone ? contact.phone.split('-').join('') : ''; //11-1111-1111
      // ... otros campos
  
    }
  }