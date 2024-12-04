import passport from 'passport';
import local from 'passport-local';
import UserModel from '../models/user.models.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //Nota que passport utiliza sus propios "middlewares" de acuerdo a cada estrategia
    //Inicializamos la estrategia local
    /*
    * username será en este caso el correo.
    * done será el callback de resolución de passport, el primer argumento es para error y el segundo para el usuario.
    */
   passport.use('register', new LocalStrategy( {passReqToCallback: true, usernameField: 'email'},  //passReqToCallback permite que se pueda acceder al objeto req como cualquier otro middleware.
        async (req, email, password, done) => {
            const { first_name, last_name, age } = req.body;
            try {
                let user = await UserModel.findOne({ email: email });
                if (user) {
                    //NO encontrar un usuario no significa que sea un error, asi que el error lo pasamos como null, pero al usuario como false
                    //esto significa "No ocurrio un error al buscar el usuario, pero el usuario ya existe y no puedo dejarte continuar" 
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser( async(id, done) => {
        let user = await UserModel.findById(id);
        done(null, user.id);
    })
    passport.use('login',new LocalStrategy({passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            console.log(email);
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                console.log('User doesnt exist');
                return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
                return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
    ))
}

export default initializePassport;