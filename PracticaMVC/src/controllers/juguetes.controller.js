import * as juguetesService from '../services/jueguetes.service.js'; 

export const obtenerJuguetes = async (req, res) => {
    try{
        const juguetes = await juguetesService.obtenerJuguetes();
        //transformaciones o modificaciones que quiera hacer sobre los datos
        res.json(juguetes);
    }catch(error){
        res.status(500).json( {error: error.message}); //Manejo de errores
    }  
    
}

export const crearJuguete = async (req, res) => {
    try {
      const nuevoJuguete = await juguetesService.crearJuguete(req.body);
      res.status(201).json(nuevoJuguete);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

