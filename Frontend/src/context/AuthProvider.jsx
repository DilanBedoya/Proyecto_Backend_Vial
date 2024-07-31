import axios from "axios"
import { createContext, useEffect, useState } from "react"


// Creación del grupo de whatsapp
const AuthContext = createContext()

// Mensaje a transmitir
const AuthProvider = ({ children }) => {

    // Almacenar la info del usuario - perfil
    const [auth, setAuth] = useState({})

    const [data, setData] = useState("Info del context")
    
    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            console.log(respuesta)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Recuperando el token del LS
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])

    // El texto del mensaje
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth ,
                data,
                setData            
            }
        }>
            {children}
        </AuthContext.Provider>
    )


}


export {
    AuthProvider
}
export default AuthContext
