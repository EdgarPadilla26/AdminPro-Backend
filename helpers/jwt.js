const jwt = require('jsonwebtoken');
 

const crearJwt = uid => {
    
    return new Promise((resolve, reject)=>{
        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '7d'}, (error, token)=>{
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