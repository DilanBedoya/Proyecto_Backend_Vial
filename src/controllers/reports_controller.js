import Administrator from '../models/administrator.js';
import Reports from '../models/reports.js'
import mongoose from 'mongoose'

const detalleReporte = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "lo sentimos debe ser un id valido" })

    const reporte = await Reports.findById(id).populate({
        path: 'usuario',
        select: '_id name lastname telefono email'
    }
    ).select('ubicacion descripcion situacion');
    res.status(200).json(reporte);

};

const registrarReporte = async (req, res) => {
    const { usuario } = req.body;
    if (!mongoose.Types.ObjectId.isValid(usuario)) return res.status(400).json("Lo sentimos el usuario no existe")
    const reportedatos = await Reports.create(req.body);
    res.status(200).json({ msg: `Registro realizado con exito ${reportedatos._id}`, reportedatos })
}


const actualizarReporte = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msh: "Proporcionar un id valido" })

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos debe llenar todos los campos" })

    await Reports.findByIdAndUpdate(req.params.id, req.body)
    const reporte = await Reports.findById(id).select('_id ubicacion descripcion situacion usuario')

    res.status(200).json({ msg: "Actualizacion realizada con exito", reporte })

}

const eliminarReporte = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Proporcionar un id valido" })

    await Reports.findOneAndDelete(id)
    res.status(200).json({ msg: "Reporte eliminado con exito" })

}
const actualizarestadoReporte = async (req, res) => {
    const { id } = req.params;
    const { situacion } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "El id proporcionado no es valido" })
    
    await Reports.findByIdAndUpdate(id, { situacion })
    res.status(200).json("Actualizacion de situacion realizada correctamente")
}


const listarReportes = async (req, res) => {
    const reports = await Reports.find({ status: true }).where('usuario').select("-createdAt -updatedAt -__v")
    res.status(200).json({
        reports
    })
}


export {
    detalleReporte,
    registrarReporte,
    actualizarReporte,
    eliminarReporte,
    actualizarestadoReporte,
    listarReportes
}
