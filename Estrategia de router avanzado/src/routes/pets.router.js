import { Router } from "express";

const router = Router();
const pets = []; //Simular una base de datos en memoria

//router.param para acceder directamente a la mascota
router.param('pet', (req, res, next, petName)=> {
    const pet = pets.find(unaMascota => unaMascota.name === petName);
    if(pet){
        req.pet = pet;
        next();
    }else{
        res.status(404).send('Mascota no encontrado');
    }
})

//POST /api/pets -> Crear una mascota
router.post('/', (req,res) => {
    const {name, specie } = req.body;
    if(!name || !specie){
        return res.status(400).send('Nombre y especie son obligatorios');
    }
    const newPet = {name, specie};
    pets.push(newPet);
    res.status(201).send(newPet);
});

//GET /api/pets/:pet -> Obtener una mascota por nombre (solo letras y espacios)
router.get('/:pet([a-zA-Z%20]+)', (req,res) => {
    // En req.pet ya esta disponible la mascota gracias a router.param
    res.send(req.pet);
});

//PUT /api/pets/:pet -> Actualizar el estado de adopción de una mascota
router.put('/:pet', (req,res) => {
    // en req.pet ya esta disponible la mascota gracias a router.param
    req.pet.adopted = true;
    res.send(req.pet);
});

export default router;