const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const borrarImagen = (imagen) => {
    if( fs.existsSync( imagen )){
        fs.unlinkSync(imagen);
    }
}

const existeID = (id) =>{
    if(!id){
        console.log('no se encontro usuario');
        return false;
    }
}

const asignarArchivo = async (tabla,id,nombreArchivo)=>{

    let existeImagen;
    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);

            existeID(usuario);

            existeImagen = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(existeImagen);

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;

        break;
        case 'hospitales':
            const hospitales = await Hospital.findById(id);

            existeID(hospitales);

            existeImagen = `./uploads/hospitales/${hospitales.img}`;
            borrarImagen(existeImagen);

            hospitales.img = nombreArchivo;
            await hospitales.save();

            return true;

        break;

        case 'medicos':
            const medicos = await Medico.findById(id);
            existeID(medicos);

            existeImagen = `./uploads/medicos/${medicos.img}`;
            borrarImagen(existeImagen);

            medicos.img = nombreArchivo;
            await medicos.save();

            return true;
        break;
    }
}

module.exports = {
    asignarArchivo,
}