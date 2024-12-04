import { Contacts , Products } from "../dao/factory.js";

import ContactRepository from "./ContactsRepository.js";
import ProductRepository from "./ProductsRepository.js";

export const contactsService = new ContactRepository(new Contacts());
export const productsService = new ProductRepository(new Products());

