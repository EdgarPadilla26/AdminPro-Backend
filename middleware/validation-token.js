const {response} = require('express');
const jwt = require('jsonwebtoken');

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


module.exports = {
    validarToken
};