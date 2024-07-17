import { check, validationResult } from 'express-validator'

export const validacionReportes =[
    check(["ubicacion","descripcion","usuario"])
        .exists()
            .withMessage('Los campos "ubicacion" "descripcion" y/o "usuario" son obligatorios')
        .notEmpty() 
            .withMessage('Los campos "ubicacion" "descripcion" y/o "usuario" no pueden estar vacíos')
        .customSanitizer(value => value?.trim()), //quitar espacios vacios

    check("ubicacion")
        .isLength({ min: 3, max: 20 })
            .withMessage('El campo "ubicacion" debe tener entre 3 y 20 caracteres')
        .customSanitizer(value => value?.trim()),

    check("descripcion")
        .isLength({ min: 5, max: 100 })
            .withMessage('El campo "descripcion" debe tener entre 5 y 100 caracteres')
        .customSanitizer(value => value?.trim()),

    check("usuario")
        .isMongoId()
            .withMessage('El ID del usuario no es válido'),


    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]