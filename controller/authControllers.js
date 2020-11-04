const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { crearJwt } = require('../helpers/jwt');

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
        }); 

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error'
        });     
    }
}

module.exports = {
    login,
}