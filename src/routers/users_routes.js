import { Router } from "express";


const router = Router()


import {
    login,
    registro,
    confirmarEmail,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
    detallesUsuario,
    detalleReportes
} from "../controllers/users_controller.js"
import verificarTokenUsers from "../middlewares/autenticacion_user.js";

router.post('/user/login',login)
router.post('/user/register',registro)
router.get('/user/confirmation/:token',confirmarEmail)
router.post('/user/recover-password',recuperarPassword)
router.get('/user/recover-password/:token',comprobarTokenPasword)  //comprobar que este funcionando
router.post('/user/new-password/:token',nuevoPassword)


router.put('/user/actualizarpassword',verificarTokenUsers, actualizarPassword)
router.put('/user/:id',verificarTokenUsers, actualizarPerfil)
router.get('/user/detalle/:id',verificarTokenUsers,detalleReportes)
router.get('/user/:id',verificarTokenUsers,detallesUsuario)

export default router