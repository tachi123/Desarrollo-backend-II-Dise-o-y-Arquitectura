import { Command } from 'commander';

const program = new Command(); // Inicializamos un nuevo comando de commander

program
  .option('-d', 'Variable para debug', false) // primero: El comando, segundo: descripción, tercero: valor default
  .option('-p <port>', 'puerto del servidor', 8080) // port es el puerto a colocar
  .option('--mode <mode>', 'Modo de trabajo', 'production') // <mode> es el argumento a colocar
  .requiredOption('-u <user>', 'Usuario utilizando el aplicativo', 'No se ha declarado un usuario') //para requiredOption, el tercer arg es un mensaje de error en caso de que no se especifique
  .option('-l, --letters [letters...]', 'specify letters');

program.parse(); // parse se utiliza para cerrar la configuración de comandos.

console.log('Options:', program.opts());
console.log('Remaining arguments:', program.args);