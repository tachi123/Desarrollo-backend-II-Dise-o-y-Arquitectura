import Router from './router.js';

export default class UsersRouter extends Router{
    init(){
       //Nota que dentro de "init" realizamos la inicialización de nuestras
        //rutas, esto sería el equivalente de decir "router.get"
        this.get('/', ["PUBLIC"], (req, res) => {
            res.sendSuccess('Hola, Coders!');
        }); 

        this.get('/currentUser', ["USER" , "USER_PREMIUM"], (req, res) =>{
            res.sendSuccess(req.user);
        })
    }
}