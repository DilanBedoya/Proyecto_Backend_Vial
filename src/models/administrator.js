import mongoose, { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'


const administratorSchema = new Schema({
    name: {
        type: String,
        require: true,
        trime: true,
        lowercase: true,
        
    },
    lastname: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    confirmarEmail: {
        type: Boolean,
        default: false
    },
    reporte: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reports"
        }
    ]

},{
    timestamps:true
})

administratorSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

administratorSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

administratorSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model ("Administrator", administratorSchema)