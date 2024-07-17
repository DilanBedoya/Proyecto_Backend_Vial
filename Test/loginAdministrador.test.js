import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { detallesUsuario } from '../src/controllers/users_controller.js';
import users from '../src/models/users.js';

describe('detallesUsuario', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            params: {
                id: '60d5f9b9f1a4c828b4d6f8b9'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        sandbox.stub(mongoose.Types.ObjectId, 'isValid');
        sandbox.stub(users, 'findById');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('debería retornar un 404 si el ID no es válido', async () => {
        mongoose.Types.ObjectId.isValid.returns(false);
        await detallesUsuario(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ msg: `Lo sentimos, debe ser un id válido` })).to.be.true;
    });

    it('debería retornar un 404 si el usuario no existe', async () => {
        mongoose.Types.ObjectId.isValid.returns(true);
        const query = { select: sinon.stub().resolves(null) };
        users.findById.returns(query);
        await detallesUsuario(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ msg: `Lo sentimos, no existe el usuario ${req.params.id}` })).to.be.true;
    });

    it('debería retornar un 200 y el usuario si existe', async () => {
        mongoose.Types.ObjectId.isValid.returns(true);
        const userBDD = { _id: '60d5f9b9f1a4c828b4d6f8b9', name: 'John Doe' };
        const query = { select: sinon.stub().resolves(userBDD) };
        users.findById.returns(query);
        await detallesUsuario(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ msg: userBDD })).to.be.true;
    });
});