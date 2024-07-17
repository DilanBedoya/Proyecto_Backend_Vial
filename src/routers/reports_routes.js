import {listarReportes,actualizarestadoReporte, actualizarReporte, detalleReporte, eliminarReporte, registrarReporte } from '../controllers/reports_controller.js'
import { validacionReportes } from '../middlewares/Validacion_reportes.js'
import verificarTokenAdministrador from '../middlewares/autenticacion_admin.js'
import verificarTokenUsers from '../middlewares/autenticacion_user.js'
import {Router} from 'express'
const router = Router()

router.get('/reporte/:id',verificarTokenUsers,detalleReporte)
router.get('/reportes',listarReportes)
router.post('/reporte/registro',verificarTokenUsers,validacionReportes,registrarReporte)
router.put('/reporte/:id',verificarTokenUsers,actualizarReporte)
router.delete('/reporte/:id',verificarTokenUsers,eliminarReporte)
router.put('/reporte/actualizacionestado/:id',verificarTokenAdministrador,actualizarestadoReporte)



export default router