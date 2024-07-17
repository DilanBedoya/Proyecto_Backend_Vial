import { expect } from 'chai';
import sinon from 'sinon';
// Importa la función que vas a probar
import { registroAdministrador } from '../src/controllers/admin_controller.js';
// Mock de Administrador y sendMailToAdmin
import Administrador from '../src/models/administrator.js';

describe('registroAdministrador', () => {
    let req, res, sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {
                email: 'coursecraft3@gmail.com',
                password: 'password123'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        sandbox.stub(Administrador, 'findOne');
        sandbox.stub(Administrador.prototype, 'encrypPassword');
        sandbox.stub(Administrador.prototype, 'crearToken');
        sandbox.stub(Administrador.prototype, 'save');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('debería retornar un 400 si hay campos vacíos', async () => {
        req.body.email = '';
        await registroAdministrador(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ msg: "Lo sentimos no deben existir campos vacios" })).to.be.true;
    });

    it('debería retornar un 400 si el correo ya está registrado', async () => {
        Administrador.findOne.resolves({ email: 'esfot@gmail.com' });
        await registroAdministrador(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ msg: "Este correo ya fue registrado" })).to.be.true;
    });

    it('debería registrar un nuevo administrador exitosamente', async () => {
        Administrador.findOne.resolves(null);
        Administrador.prototype.encrypPassword.resolves('encryptedPassword');
        Administrador.prototype.crearToken.returns('token');
        Administrador.prototype.save.resolves();
        await registroAdministrador(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ msg: "Revisa tu correo electronico de administrador para verificar tu cuenta " })).to.be.true;
    });
});