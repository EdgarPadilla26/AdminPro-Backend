const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, resp = response)=>{

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    resp.json({
        ok: true,
        medicos,
    });  
}

const crearMedico = async(req, resp = response)=>{

    const { uid } = req.uid;
    const nombrehospital = req.body.nombrehospital; 
    const {nombre} = req.body;
    
    const medico = new Medico({hospital: nombrehospital, usuario: uid, ...req.body});

    try {

        const medicoDB = await Medico.findOne({nombre});
        if(medicoDB){
            return resp.status(400).json({
                ok: false,
                msg: 'Ya existe un medico con ese nombre',
            });
        }
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

    const idmed = req.params.id;
    const idhosp = req.body.nombrehospital;
    const {uid} = req.uid;

    try {

        const medicoDB = await Medico.findById(idmed);
        if(!medicoDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No se encuetra el hospital con ese ID',
            });    
        }

        const cambios = { usuario: uid, hospital: idhosp, ...req.body};

        const medicolUp = await Medico.findByIdAndUpdate(idmed, cambios, {new: true});
        
        resp.json({
            ok: true,
            medico: medicolUp
        }); 

    } catch (error) {
            
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}

const deleteMedico = async(req, resp = response)=>{

    const idmed = req.params.id;

    try {

        const medDB = await Medico.findById(idmed);
        if(!medDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No se encuetra el medico con ese ID',
            });    
        }

        await Medico.findByIdAndDelete(idmed);
        
        resp.json({
            ok: true,
            msg: 'Medico eliminado',
        }); 


    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}

const medicoId = async (req, resp = response)=>{

    const uid = req.params.id;
    
    try {

        const medicoDB = await Medico.findById(uid).populate('usuario', 'nombre').populate('hospital', 'nombre');

        if(!medicoDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No se encuetra el medico con ese ID',
            });    
        }

        resp.json({
            ok: true,
            medicoDB,
        }); 
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico,
    medicoId,
}