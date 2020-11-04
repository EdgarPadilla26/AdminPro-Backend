const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async(req, resp = response)=>{

    const hospitales = await Hospital.find().populate('usuario', 'nombre');

    resp.json({
        ok: true,
        hospitales,
    }); 
}

const crearHospital = async(req, resp = response)=>{
    
    const { uid } = req.uid;
    const { nombre } = req.body;
    const hospital = new Hospital({usuario: uid , ...req.body});
    
    try {

        const repeatedNom = await Hospital.findOne({nombre});

        if(repeatedNom){
            return resp.status(400).json({
                ok: false,
                msg: 'Ya existe ese nombre para un hospital',
            });    
        } 

        const nuevoHospital = await hospital.save();

        resp.json({
            ok: true,
            hospital: nuevoHospital,
        }); 
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }

}

const updateHospital = async(req, resp = response)=>{

    resp.json({
        ok: true,
        msg: 'updateHospitales',
    }); 
}

const deleteHospital = async(req, resp = response)=>{

    resp.json({
        ok: true,
        msg: 'deleteHospitales',
    }); 
}


module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital,
}