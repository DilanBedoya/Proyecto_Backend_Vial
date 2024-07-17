import Administrador from '../models/administrator.js'
import mongoose from 'mongoose'
import {
    sendMailToRecoveryPassword, sendMailToAdmin
} from "../config/nodemailer.js";
import generarJWT from '../helpers/crearJWT.js';

const registroAdministrador=async(req,res)=>{
    const {email,password}=req.body;
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos no deben existir campos vacios"})
    const verificarEmailAdminBDD = await Administrador.findOne({email})
    if(verificarEmailAdminBDD)
        return res.status(400).json({msg:"Este correo ya fue registrado"})
    
    const nuevoAdministrador = new Administrador(req.body);
    nuevoAdministrador.password = await nuevoAdministrador.encrypPassword(password);

    const token=nuevoAdministrador.crearToken();
    await sendMailToAdmin(email,token);
    await nuevoAdministrador.save()
    
    res.status(200).json({msg:"Revisa tu correo electronico de administrador para verificar tu cuenta "})

}


const loginAdministrador= async(req,res)=>{
    const {email,password} = req.body;

    if(Object.values(req.body).includes(""))return res.status(400).json({msg:"Porfavor complete los campos"})
    const administradorBdd = await Administrador.findOne({email})
    //confirmacion cuenta
    if(administradorBdd?.confirmarEmail===false) return res.status(403).json({msg:"Lo sentimos debe verificar su cuenta"})
    //verificar el email que se ingreso
    if(!administradorBdd) return res.status(404).json({msg:"Lo sentimos el email no se encuentra registrado"})
    //verificar el password que se ingreso
    const verificarPassword = await administradorBdd.matchPassword(password);
    if (!verificarPassword)
    return res.status(404).json({
      msg: "Lo sentimos, el password no es correcto",
    });

    const { name, lastname, _id } = administradorBdd;
    const token = generarJWT(administradorBdd._id, "administrador");
    //Actividad 4
    res.status(202).json({
        token,
        name,
        lastname,
        _id,
        email: administradorBdd.email,
    });
    
}

const confirmaremailAdministrador=async(req,res)=>{
    //ACTIIVIDAD 1
    if (!req.params.token)
        return res
            .status(400)
            .json({ msg: "Lo sentimos, no se puede validar la cuenta" });
    const administradorBdd = await Administrador.findOne({ token: req.params.token });

    //ACTIIVIDAD 2
    if (!administradorBdd?.token)
        return res.status(404).json({ msg: "La cuenta ya ha sido confirmada, por favor valide su token" });

    //ACTIIVIDAD 3
    administradorBdd.confirmarEmail = true;
    administradorBdd.token = null;
    await administradorBdd.save();

    //ACTIIVIDAD 4
    res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" });
}


const detallesAdministrador=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos el id proporcionado no es valido"})
    const administradorBdd = await Administrador.findById(id).select("-password")
    if(!administradorBdd) return res.status(404).json({msg:`Lo sentimos el administrador con el id ${id} actualmente no se encuentra en la BDD`})
    res.status(200).json({msg:administradorBdd})
}

const actualizarAdministrador=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos el id ingresado no es valido"})
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Por favor completar todos los campos "})
    
    const administradorBdd = await Administrador.findById(id)
    if(!administradorBdd) return res.status(404).json({msg:`Lo sentimos el administrador con el id ${id} actualmente no se encuentra en la BDD`})
    if(administradorBdd.email === req.body.email)return res.status(404).json({msg:"El correo ingresado coincide con el actual, actualizacion rechazada"})
    if(administradorBdd.email != req.body.email){
        const administradorEmailBDD = await Administrador.findOne({ email: req.body.email })
        if(administradorEmailBDD) return res.status(404).json({msg:"Lo setimos ese correo ya se encuentra registrado"})
    }
    administradorBdd.name = req.body.name || administradorBdd?.name
    administradorBdd.lastname = req.body.lastname || administradorBdd?.lastname
    administradorBdd.email = req.body.email || administradorBdd?.email

    administradorBdd.save()
    res.status(200).json({msg:"Actualizacion realizada con exito"})
    
}

const recuperarPasswordpasswordAdministrador=async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const administradorBdd = await Administrador.findOne({email})
    if(!administradorBdd) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = administradorBdd.crearToken()
    administradorBdd.token=token
    await sendMailToRecoveryPassword(email,token)
    await administradorBdd.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}

const comprobartokenpasswordAdministrador=async(req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        const administradorBdd = await Administrador.findOne({token:req.params.token})
        if(administradorBdd?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        await administradorBdd.save()
      
        res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}

const nuevopasswordAdministrador=async(req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const administradorBdd = await Administrador.findOne({token:req.params.token})
    if(administradorBdd?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    administradorBdd.token = null
    administradorBdd.password = await administradorBdd.encrypPassword(password)
    await administradorBdd.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}



const actualizarpasswordAdministrador=async(req,res)=>{

    const administradorBdd = await Administrador.findById(req.administradorBdd._id)
    if(!administradorBdd) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    const verificarPassword = await administradorBdd.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    administradorBdd.password = await administradorBdd.encrypPassword(req.body.passwordnuevo)
    await administradorBdd.save()
    res.status(200).json({msg:"Password actualizado correctamente"})

}


export {
    registroAdministrador,
    loginAdministrador,
    confirmaremailAdministrador,
    detallesAdministrador,
    actualizarAdministrador,
    actualizarpasswordAdministrador,
    comprobartokenpasswordAdministrador,
    nuevopasswordAdministrador,
    recuperarPasswordpasswordAdministrador
}