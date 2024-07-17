import mongoose, {Schema,model} from 'mongoose'

const reportsSchema = new Schema({
    ubicacion:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    situacion:{
        type:String,
        require:true,
        enum:['Pendiente','En proceso','Resuelto'],
        default: 'Pendiente'
    },
    status:{
        type:Boolean,
        default:true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})

export default model('Reports',reportsSchema)