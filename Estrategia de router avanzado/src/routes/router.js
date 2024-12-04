import { Router  as ExpressRouter} from 'express';
import jwt from 'jsonwebtoken';

export default class Router {
  constructor() {
    this.router = ExpressRouter();
    this.init();
  }
  getRouter() {
    return this.router;
  }

  init() { //Esta inicialización será para sus clases heredadas
  }
  get(path, policies, ...callbacks) {
    this.router.get(path,this.handlePolices(policies) , this.generateCustomResponses, this.applyCallbacks(callbacks));
  }

  put(path, policies, ...callbacks) {
    this.router.get(path,this.handlePolices(policies) , this.generateCustomResponses, this.applyCallbacks(callbacks));
  }

  post(path, policies, ...callbacks) {
    this.router.get(path,this.handlePolices(policies) , this.generateCustomResponses, this.applyCallbacks(callbacks));
  }

  delete(path, policies, ...callbacks) {
    this.router.get(path,this.handlePolices(policies) , this.generateCustomResponses, this.applyCallbacks(callbacks));
  }

  applyCallbacks(callbacks) {
    //mapearemos los callbacks uno a uno, obteniendo sus parámetros a partir de ...
    return callbacks.map((callback) => async (...params) => {
      try {
        //apply, ejecutará la función callback apuntando directamente a una 
        //instancia de la clase, por ello, colocamos this para que se utilice
        //sólo en el contexto de este router, los parámetros son internos
        //de cada callback, sabemos que los params de un callback corresponden a
        //req,res,next
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        //params[1] hace referencia a res, por ello puedo mandar un send desde
        //éste.
        params[1].status(500).send(error);
      }
    })
  }

  generateCustomResponses = (req, res, next) => {
    //sendSuccess permitirá que el desarrollador
    //sólo tenga que enviar el payload, el formato
    //se gestionará de manera interna.
    res.sendSuccess = payload => res.send({ status: "success", payload });
    res.sendServerError = error => res.status(500).send({ status: "error", error });
    res.sendUserError = error => res.status(400).send({ status: "error", error });
    next();
  }

  //policies es un array de strings como argumento
  // ["USER","USER PREMIUM", "ADMIN"]
  handlePolices = policies => (req,res,next) => {
    if (policies[0] === "PUBLIC") return next(); //Cualquiera puede entrar
    const authHeaders = req.headers.authorization;
    if (!authHeaders) return res.status(401).send({ status: "error", error: "Unauthorized" });
    const token = authHeaders.split(" ")[1]; //Removemos el Bearer   'Beerar adsfsadfasdfsd'
    //Obtenemos el usuario a partir del token;
    let user = jwt.verify(token, 'CoderSecretClaseRouter');
    //¿El rol del usuario existe dentro del arreglo de políticas?
    if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({ error: "No tienes permisos para acceder a esta ruta" });
    req.user = user;
    next();
  }

  // ... otros métodos HTTP (post, put, delete, etc.) ...
}

