const jwt = require('jsonwebtoken');
 

const crearJwt = (uid, nombre) => {
    
    return new Promise((resolve, reject)=>{
        const payload = {
            uid, 
            nombre
        }
    
        jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '12h'}, (error, token)=>{
            if(error){
                console.log(error);
                reject("No se genero token");
            }
            resolve(token);
        });
    });

}

module.exports = {
    crearJwt,
}