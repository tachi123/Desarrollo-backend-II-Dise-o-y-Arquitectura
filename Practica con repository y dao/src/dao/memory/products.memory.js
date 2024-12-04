// Versión en memoria (products.memory.js)

export default class Products {
    constructor() {
      this.data = [];
    }
    get = () => this.data;
  
  }
  
  // Versión MongoDB (products.mongo.js - Requiere modelo productsModel)
  
  // import productsModel from './models/Products.js';
  
  // export default class Products {
  
  //   get = async () => await productsModel.find();
  
  // }