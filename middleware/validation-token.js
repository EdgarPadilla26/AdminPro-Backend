const {response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = (req, resp = response , next)=>{

    //Leer TOKEN
    const token = req.header('utoken');

    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No estas autorizado (No existe token)',
        });
    }

    try {

        const uid = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid; 
        next();
        
    } catch (error) {
        
        console.log(error);
        return resp.status(401).json({
            ok: false,
            msg: 'No estas autorizado (token invalido)',
        });
    }
    
}

const validarRol = async (req, resp = response, next)=>{

    const {uid} = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
            });
        }

        if(usuarioDB.rol==='USER_ROL'){
            return resp.status(403).json({
                ok: false,
                msg: 'No puedes hacer modificaciones',
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });
    }
}

const validarRolMismo = async (req, resp = response, next)=>{

    const {uid} = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
            });
        }

        if(usuarioDB.rol==='USER_ROL' && uid != id){
            return resp.status(403).json({
                ok: false,
                msg: 'No puedes hacer modificaciones',
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });
    }
}

module.exports = {
    validarToken,
    validarRol,
    validarRolMismo
};