const express = require('express');
const { dbConnect } = require('./DB/config'); 
const cors = require('cors');
require('dotenv').config();

//Crear servidor
const servidor = express();

//configurar cors
servidor.use(cors());

//Base de datos

dbConnect();

//UserMongo
//Password a3zHk7EIWqzGziBj

//Rutas
servidor.listen( process.env.PORT, () => console.log("levantado " + process.env.PORT));

servidor.get('/', (req, resp)=>{
    resp.json({
        ok: true,
        cadeda: "simon que si",
    }); 
});