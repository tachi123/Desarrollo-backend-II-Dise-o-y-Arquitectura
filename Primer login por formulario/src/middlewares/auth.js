import express from 'express';

export const isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next(); //Permitir el acceso si hay sesión
    } else {
        res.redirect('/api/user/login'); //Redirigo al login si no hay sesión
    }
}


export const isLoggedOut = (req, res, next) => {
    if(req.session.user){
        res.redirect('/api/user/perfil'); //Redirige al perfil si ya estoy logueado
    } else {
        next(); //Permitir el acceso si no hay sesión
    }
}