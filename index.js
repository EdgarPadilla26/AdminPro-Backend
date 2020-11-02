const express = require('express');
const { dbConnect } = require('./DB/config'); 
const cors = require('cors');
require('dotenv').config();

//Crear servidor
const servidor = express();

//configurar cors
servidor.use(cors());

//Lectura body (post)
servidor.use(express.json());


//Base de datos
dbConnect();

//UserMongo
//Password a3zHk7EIWqzGziBj

//Rutas

servidor.use('/api/usuario', require('./routes/usuarioRoute'));
servidor.use('/api/auth', require('./routes/authRoute'));

servidor.listen( process.env.PORT, () => console.log("levantado " + process.env.PORT));