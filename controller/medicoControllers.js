const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getMedicos = async(req, resp = response)=>{

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    resp.json({
        ok: true,
        medicos,
    });  
}

const crearMedico = async(req, resp = response)=>{

    const { uid } = req.uid;
    const {nombrehospital} = req.body; 
    
    const medico = new Medico({hospital: nombrehospital, usuario: uid, ...req.body});

    try {
        const nuevoMedico = await medico.save();

        resp.json({
            ok: true,
            medico: nuevoMedico,
        }); 
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}

const updateMedico = async(req, resp = response)=>{

    resp.json({
        ok: true,
        msg: 'updateMedico',
    }); 
}

const deleteMedico = async(req, resp = response)=>{

    resp.json({
        ok: true,
        msg: 'deleteMedico',
    }); 
}


module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico,
}