import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { actualizarReporte } from '../src/controllers/reports_controller.js';
import Reports from '../src/models/reports.js';

describe('actualizarReporte', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            params: {
                id: '60d5f9b9f1a4c828b4d6f8b9'
            },
            body: {
                ubicacion: 'Villaflora',
                descripcion: 'Choque entre un bus y un automovil',
                situacion: 'Pendiente',
                usuario: '669738ad1c42ec2c66dda5c7'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        sandbox.stub(mongoose.Types.ObjectId, 'isValid');
        sandbox.stub(Reports, 'findByIdAndUpdate');
        sandbox.stub(Reports, 'findById');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('debería retornar un 404 si el ID no es válido', async () => {
        mongoose.Types.ObjectId.isValid.returns(false);
        await actualizarReporte(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ msh: "Proporcionar un id valido" })).to.be.true;
    });

    it('debería retornar un 400 si hay campos vacíos en el cuerpo de la solicitud', async () => {
        mongoose.Types.ObjectId.isValid.returns(true);
        req.body.descripcion = ""; // Simulando un campo vacío
        await actualizarReporte(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ msg: "Lo sentimos debe llenar todos los campos" })).to.be.true;
    });

    it('debería retornar un 200 y el reporte actualizado si la actualización es exitosa', async () => {
        mongoose.Types.ObjectId.isValid.returns(true);
        Reports.findByIdAndUpdate.resolves();
        const reporte = {
            _id: '60d5f9b9f1a4c828b4d6f8b9',
            ubicacion: 'Villaflora',
            descripcion: 'Falta de señalizacon',
            situacion: 'Pendiente',
            usuario: '669738ad1c42ec2c66dda5c7'
        };
        const query = {
            select: sinon.stub().returnsThis(),
            exec: sinon.stub().resolves(reporte)
        };
        Reports.findById.returns(query);
        await actualizarReporte(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ msg: "Actualizacion realizada con exito", reporte })).to.be.true;
    });
});
