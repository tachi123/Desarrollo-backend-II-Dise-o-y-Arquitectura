import * as juguetesDAO from '../models/jueguetes.models.js'; //Importamos las funciones del DAO

export const obtenerJuguetes = async () => {
    return await juguetesDAO.obtenerJuguetes();
};
    
export const crearJuguete = async (juguete) => {
    return await juguetesDAO.crearJuguete(juguete);
};
  
// ... otras funciones del servicio, usando juguetesDAO