import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command();

program
    .option('--mode <mode>', 'Modo de operación (developmento production)', 'development') // <mode> es el argumento a colocar
    .parse(); // parse se utiliza para cerrar la configuración de comandos.


const environment = program.opts().mode;

try{
    dotenv.config({
        path:`.env.${environment}`
    });
} catch(error){
    console.error(`Error al cargar el archivo .env.${mode}:`, error);
    process.exit(1); //Salir con código de eror
}

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  mode: environment
};