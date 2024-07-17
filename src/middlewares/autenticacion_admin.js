import jwt from 'jsonwebtoken';
import Administrador from '../models/administrator.js';

const verificarTokenAdministrador = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }
    const { authorization } = req.headers;
    try {
        const { id, rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
        if (rol === "administrador") {
            req.administradorBdd = await Administrador.findById(id).lean().select("-password");
            next();
        } else {
            return res.status(403).json({ msg: "Acceso no autorizado para este rol" });
        }
    } catch (error) {
        const e = new Error("Formato del token no válido");
        return res.status(404).json({ msg: e.message });
    }
};

export default verificarTokenAdministrador;
