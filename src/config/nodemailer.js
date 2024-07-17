import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


//Configuraciones del transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});
//Método del correo

const sendMailToUser = (userMail, token) => {

    let mailOptions = {
        from: process.env.USER_MAILTRAP, //Desde donde
        to: userMail, //Para quien
        subject: "Verifica tu cuenta", //Asunto
        html: `<p>Hola, haz clic <a href="${process.env.URL_BACKEND}/user/confirmation/${encodeURIComponent(token)}">aquí</a> para confirmar tu cuenta.</p>`  //cuerpo del mensaje
    };


    //Exportación del método del correo
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
const sendMailToAdmin = (userMail, token) => {

    let mailOptions = {
        from: process.env.USER_MAILTRAP, //Desde donde
        to: userMail, //Para quien
        subject: "Verifica tu cuenta", //Asunto
        html: `<p>Hola, haz clic <a href="${process.env.URL_BACKEND}/admin/confirmation/${encodeURIComponent(token)}">aquí</a> para confirmar tu cuenta.</p>`  //cuerpo del mensaje
    };


    //Exportación del método del correo
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

const sendMailToRecoveryPassword = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Sistema de gestión (Viables del DM de Quito 🚗)</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}/admin/recover-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}


const sendMailToRecoveryPasswordUser = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Sistema de gestión (Viables del DM de Quito 🚗)</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}/user/recover-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

export {
    sendMailToUser,
    sendMailToAdmin,
    sendMailToRecoveryPassword,
    sendMailToRecoveryPasswordUser
}

