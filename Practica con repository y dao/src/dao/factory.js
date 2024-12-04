import config from '../config.js';
import mongoose from 'mongoose';

let persistence;

switch (config.persistence) {
  case 'MEMORY':
    const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
    const { default: ProductsMemory } = await import('./memory/products.memory.js');
    persistence = new ProductsMemory();
    break;
  case 'MONGO':
    const connection = mongoose.connect(config.urlmongo); //Conexión a mongo
    const { default: ContactsMongo } = await import('./mongo/contacts.mongo.js');
    persistence = new ContactsMongo();
    break;
  // Otros casos para FILE, etc.
  default:
    throw new Error('Persistencia no soportada');
}

export default persistence;