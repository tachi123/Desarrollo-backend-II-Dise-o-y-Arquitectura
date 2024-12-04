import config from './config/config.js';
import express from 'express';

const app = express();

console.log(config);

const port = config.port;

const ERROR_FILE_NOT_FOUND = 101;
const ERROR_DATABASE_CONNECTION = 100;
const ERROR_TYPEOF_PARAMETERS = -4;

process.on('exit', code => {
    if (code === ERROR_TYPEOF_PARAMETERS) {
        console.log('Proceso finalizado por argumentación inválida en una función');
      } else if (code === 0){
        console.log("Proceso finalizado correctamente")
      } else {
        console.log(`Proceso finalizado con código: ${code}`);
      }
});

process.on('uncaughtException', exception => {
    console.log('Este código atrapa todas las excepciones no controladas como llamar una función que no haya sido declarada');
    //console.error('¡Error no capturado!', exception);
    //process.exit(1); // Salir con un código de error indicando fallo
    if(exception.message.startsWith('Error de conexión a la base de datos')){
        process.exit(ERROR_DATABASE_CONNECTION);
    }else if(exception.message.startsWith('Archivo no encontrado')){
        process.exit(ERROR_FILE_NOT_FOUND);
    }else{
        console.error("Error no manejado", exception);
        process.exit(1);
    }
});
  
process.on('message', message => {
    console.log('Este código se ejecutará cuando reciba un mensaje de otro proceso')
});

function listNumbers(...numbers){
    const invalidParameters = numbers.filter(param => typeof param !== 'number');

    if(invalidParameters.length > 0){
        const types = invalidParameters.map(param => typeof param);
        console.error('Invalidad parameters', types);
        process.exit(ERROR_TYPEOF_PARAMETERS); //Codigo de salida personalizado
    }
    console.log('Números válidos:', numbers);
}

listNumbers(1, 2, 3 ,4 ,5); //Salida: [1, 2, 3, 4, 5]  (Proceso finalizado correctamente)
listNumbers(1, 2, 'a' , true ,5); //Salida: invalidParameters  (Proceso finalizado por tipo inválido)


   