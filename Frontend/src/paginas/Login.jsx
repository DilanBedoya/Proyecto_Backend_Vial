import axios from 'axios'
import { useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import AuthProvider from '../context/AuthProvider'

const Login = () => {

    const {setAuth,setEstado} = useContext(AuthProvider)

    const navigate = useNavigate()

    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const [mensaje, setMensaje] = useState({})

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

	const handleSubmit = async(e) => { 
        e.preventDefault()
	        try {
	            const url = `${import.meta.env.VITE_BACKEND_URL}/user/login`
	            const respuesta= await axios.post(url,form)
	            localStorage.setItem('token',respuesta.data.token)
	            setAuth(respuesta.data)
	            navigate('/dashboard')
	        } catch (error) {
	            setMensaje({respuesta:error.response.data.msg,tipo:false})
	            setform({})
	            setTimeout(() => {
	                setMensaje({})
	            }, 3000);
	        }
}

    return (
        <>
            <div className="w-1/2 h-screen bg-[url('/images/miguel.jpeg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">
                
                <div className="md:w-4/5 sm:w-full">

                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <h1 style={{ color: '#1C5739' }} className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Bienvenido!</h1>
                    <small style={{ color: '#1C5739' }} className="text-gray-400 block my-4 text-sm">Bienvenido! Por favor ingresa tus datos</small>


            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Email</label>
                    <input type="email" placeholder="Enter you email" 
                    name='email'
                    value={form.email || ""} 
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                </div>

                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Password</label>
                    <input type="password" placeholder="********************" 
                    name='password'
                    value={form.password || ""} 
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                </div>

                <div className="my-4">
                    <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                </div>

            </form >

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p style={{ color: '#1C5739' }} className="text-center text-sm">O</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-black hover:text-white">
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" />
                        Inicia sesion con Google
                    </button>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-blue-600 hover:text-white">
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" />
                         Inicia sesion con Facebook
                    </button>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" style={{ color: '#1C5739' }} className="underline text-sm text-gray-400 hover:text-gray-900">Olvidaste tu contraseña?</Link>
                    </div>

                    <div style={{ color: '#1C5739' }} className="mt-3 text-sm flex justify-between items-center">
                        <p>  No tienes cuenta?</p>
                        <Link to="/register" className=" py-2 px-5 bg-[#1C5739] text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrar</Link>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Login