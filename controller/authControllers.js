const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { crearJwt } = require('../helpers/jwt');
const {verify} = require('../helpers/googleSign');
const { getMenu } = require('../helpers/menuFront');

const login = async(req, resp = response)=>{

    const { email, password } = req.body;

    try {

        //Existe correo
        const usuarioDB = await Usuario.findOne({email});
        
        if(!usuarioDB){
            return resp.status(400).json({
                ok: false,
                msg: 'No existe el usuario o contraseña',
            });
        } 

        //Existe contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return resp.status(400).json({
                ok: false,
                msg: 'No existe el contrseña o usuario',
            });
        }

        //TOKEN
        const token = await crearJwt(usuarioDB.id);

        resp.json({
            ok: true,
            token,
            menu: getMenu(usuarioDB.rol),
        }); 

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error'
        });     
    }
}

const loginGoogle = async(req, resp = response)=>{

    const googleToken = req.body.token;

    try {

        const { name, email, picture} = await verify(googleToken);

        const usuarioDB = await Usuario.findOne({email});

        let usuario;
        if(usuarioDB){
            usuario = usuarioDB;
            usuario.google = true;
        }else{
            usuario = new Usuario(
                {
                    nombre: name,
                    email,
                    img: picture,
                    password: 'xxxx',
                    google: true
                });
        }

        await usuario.save();
        //TOKEN
        const token = await crearJwt(usuario.id);
        resp.json({
            ok: true,
            token,
            menu: getMenu(usuario.rol),
        });
        

    } catch (error) {
        console.log(error);
        resp.status(401).json({
            ok: false,
            msg: 'No se encontro token'
        }); 
    } 
}

const refreshToken = async (req, resp = response) =>{

    const {uid} = req.uid;

    const usuario = await Usuario.findById(uid);

    //TOKEN
    const token = await crearJwt(uid);
    resp.json({
        ok: true,
        token,
        usuario,
        menu: getMenu(usuario.rol),
    });
}
module.exports = {
    login,
    loginGoogle, 
    refreshToken
}