let juguetes = []; //Array para simular la base de datos

export const obtenerJueguetes = async() => {
    return juguetes;
};

export const crearJuguete = async (juguete) => {
    const nuevoJuguete = { ...juguete, id: juguetes.length + 1 }; // Asignar ID
    juguetes.push(nuevoJuguete);
    return nuevoJuguete;
};

// .. otras funciones DAO 