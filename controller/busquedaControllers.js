const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getBusqueda = async(req, resp = response)=>{

    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    try {

        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({nombre: regex}),
            Hospital.find({nombre: regex}),
            Medico.find({nombre: regex}),
        ]);

        resp.json({
            ok: true,
            usuarios,
            hospitales,
            medicos,
            busqueda: search
        }); 


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Salio algo mal'
        }); 
    }
}
const getBusquedaColeccion = async(req, resp = response)=>{

    const tabla = req.params.tabla;
    const search = req.params.search;
    
    const regex = new RegExp(search, 'i');
    let data = [];

    try {

        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({nombre: regex});
                break;
            case 'hospitales':
                data = await Hospital.find({nombre: regex})
                        .populate('usuario', 'nombre img');
                break;
            case 'medicos':
                data = await Medico.find({nombre: regex})
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre img');
                break;
            default:
                return resp.status(400).json({
                    ok: false,
                    msg: 'No se encontro la coleccion'
                }); 
                break;
        }
        resp.json({
            ok: true,
            data,
            coleccion: tabla,
            busqueda: search
        }); 


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Salio algo mal'
        }); 
    }
}


module.exports = {
    getBusqueda,
    getBusquedaColeccion
}