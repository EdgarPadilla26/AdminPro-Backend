const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const {crearJwt} = require('../helpers/jwt');



const getUsuarios = async(req, resp = response)=>{

    const desde = Number(req.query.desde) || 0;
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email google rol img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    resp.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuarios = async(req, resp = response)=>{

    const { password, email } = req.body;

    try {

        const emailrepeated = await Usuario.findOne({email});

        if(emailrepeated){
            return resp.status(400).json({
                ok: false,
                msg: 'Ya existe ese correo mijo',
            });
        }

        const nuevoUsuario = new  Usuario(req.body);

        //"salt" encrypta de forma aleatoria
        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password,salt);

        await nuevoUsuario.save();

        //TOKEN

        const token = await crearJwt(nuevoUsuario.id);

        resp.json({
            ok: true,
            nuevoUsuario,
            token,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}


const updateUsuario = async(req, resp = response) =>{


    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
            });
        }

        const {google, password, email, ...update} = req.body;

        if(!(usuarioDB.email === email)){

            const existeEmail = await Usuario.findOne({email});

            if(existeEmail){
                return resp.status(400).json({
                    ok: false,
                    msg: 'Ese correo ya esta registrado',
                });
            }
        }
        if(!usuarioDB.google){
            update.email = email;
        }else if(usuarioDB.email!=email){
            return resp.status(400).json({
                ok: false,
                msg: 'Los usuarios de google no pueden cambiar su correo',
            });
        }
        const usuarioUp = await Usuario.findByIdAndUpdate(uid, update, {new: true});

        resp.json({
            ok: true,
            usuario: usuarioUp,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        });
    }
}

const deleteUsuario = async (req, resp = response)=>{

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario',
            });
        }

        await Usuario.findByIdAndDelete(uid);

        resp.json({
            ok: true,
            msg: 'usuario borrado',
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
    getUsuarios,
    crearUsuarios,
    updateUsuario,
    deleteUsuario,
}
