import { registroAdministrador,
    loginAdministrador,
    confirmaremailAdministrador,
    detallesAdministrador,
    actualizarAdministrador,
    actualizarpasswordAdministrador,
    comprobartokenpasswordAdministrador,
    nuevopasswordAdministrador, 
    recuperarPasswordpasswordAdministrador} from "../controllers/admin_controller.js";

import { Router } from "express";

import verificarTokenAdministrador from "../middlewares/autenticacion_admin.js";




const router = Router()

router.post('/admin/login',loginAdministrador)
router.post('/admin/register',registroAdministrador)
router.get('/admin/confirmation/:token',confirmaremailAdministrador)
router.post('/admin/recover-password',recuperarPasswordpasswordAdministrador)
router.get('/admin/recover-password/:token',comprobartokenpasswordAdministrador)
router.post('/admin/new-password/:token',nuevopasswordAdministrador)


router.put('/admin/actualizarpassword', verificarTokenAdministrador,actualizarpasswordAdministrador)
router.put('/admin/:id',verificarTokenAdministrador, actualizarAdministrador)
router.get('/admin/:id',verificarTokenAdministrador,detallesAdministrador)

export default router