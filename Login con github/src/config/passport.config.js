import passport from "passport";
import GithubStrategy from 'passport-github2';
import userService from '../models/user.models.js';

const initializePassport = () => {
    passport.use('github', new GithubStrategy({
        clientID: 'Iv23liT8uq9M6wclbZPe',
        clientSecret: '13f822be59b4257be7dd06b41afae819261458fc',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
      }, async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile); //Muy recomendado hacer console.log de toda la información que viene del perfil.
          let user = await userService.findOne({ email: profile._json.email });
          if (!user) { //El usuario no existia en nuestro sitio web, lo agregamos a la base de datos.
            let newUser = {
              first_name: profile._json.name,
              last_name: '//Nota cómo nos toca rellenar los datos que no vienen desde el perfil',
              age: 18, //Nota cómo nos toca rellenar los datos que no vienen desde el perfil
              email: profile._json.email,
              password: '//Al ser autenticación de terceros, no podemos asignar un password'
            };
            let result = await userService.create(newUser);
            done(null, result);
          } else { //Si entra aqui, es porque el usuario ya existia.
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }));
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
      let user = await userService.findById(id);
      done(null, user);
    });
};

export default initializePassport;
  