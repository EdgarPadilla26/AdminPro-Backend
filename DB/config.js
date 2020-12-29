const mongoose = require('mongoose');


const dbConnect = async() =>{

   try {
        await mongoose.connect(process.env.URL,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log("DB Onlie");

   } catch (error) {
       console.log(error);
       throw new Error("Error al conectar la DB");
   }

};

module.exports = {
    dbConnect,
}


