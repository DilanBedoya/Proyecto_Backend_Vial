import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoGithub from '../assets/github.png'
import logoLinkedind from '../assets/linkedin.png'
import portada from '../assets/portada.jpeg'
import logo from '../assets/logo.jpeg'
import centralizar from '../assets/centralizar.png'
import tiemporeal from '../assets/tiempoReal.png'
import comunicacion from '../assets/comunicacion.png'
import logoWeb1 from '../assets/web1.png'
import logoWeb2 from '../assets/web2.png'
import logoWeb3 from '../assets/web3.png'
import logoWeb4 from '../assets/web4.png'
import logoWeb5 from '../assets/web5.png'
import logoWeb6 from '../assets/web6.png'
import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <div className='flex items-center'>
                            <img src={logo} alt="logo-rocket" className='mr-4' />
                            <h1 className='text-2xl font-bold dark:text-white'>FriendsTechSolutions</h1>
                        </div>
                        <ul className='flex items-center'>
                            <li><img onClick={()=>setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40}/></li>
                            <li><Link to="/login" className=' bg-[#1C5739] text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                         <h2 className='text-5xl py-2 font-medium md:text-6xl' style={{ color: '#1C5739' }}>REPORTES VIALES</h2>
                         <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white text-justify'>
                            En el mundo moderno, la movilidad eficiente y segura es una necesidad crítica para el bienestar de la sociedad. 
                            Sin embargo, la gestión de la información sobre el estado del tráfico, incidentes viales, y condiciones de las carreteras sigue siendo un desafío significativo. Actualmente, los datos relevantes se encuentran dispersos entre diversas fuentes, lo que dificulta el acceso rápido y la toma de decisiones informadas por parte de los conductores,
                            autoridades de tráfico y servicios de emergencia.
                        </p>
                    </div>

                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <img src={logoFacebook} alt="logo-redes" width={50} height={50}  className={'dark:border-2 border-teal-300 rounded-full'}/>

                        <img src={logoGithub} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>

                        <img src={logoLinkedind} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>
                    </div>

                    <div className='relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <img src={portada} alt="logo-rocket" />
                    </div>
                </section>

                <section>
                    <div>
                        <h3 className='text-3xl py-1 dark:text-white'>SERVICIOS</h3>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>En respuesta a esta problemática, se plantea el desarrollo de una aplicación innovadora que tiene como objetivos: </p>
                         </div>

                    <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={centralizar} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'></h3>
                            <p className='py-4 text-teal-600'>Centralizar la información</p>
                            <p className='py-4 text-teal-600'>Reunir datos de diferentes fuentes sobre incidentes de tránsito, condiciones de carreteras, y obras en una plataforma accesible.</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={tiemporeal} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'></h3>
                            <p className='py-4 text-teal-600'>Proveer datos en tiempo real</p>
                            <p className='py-4 text-teal-600'>Ofrecer información actualizada sobre el estado del tráfico, permitiendo a los usuarios tomar decisiones informadas.</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={comunicacion} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'></h3>
                            <p className='py-4 text-teal-600'>Facilitar la comunicación</p>
                            <p className='py-4 text-teal-600'>Mejorar la comunicación entre conductores, autoridades de tráfico y servicios de emergencia mediante reportes precisos y rápidos.</p>
                        </div>
                        
                    </div>
                </section>

                <section>
                    <div>
                        <h3 className='text-3xl py-1 dark:text-white'>Proyects</h3>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-teal-500'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-teal-500'>deleniti</span> voluptatem! Autem, veniam ut.</p>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-teal-500'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-teal-500'>deleniti</span> voluptatem! Autem, veniam ut.</p>
                    </div>


                    <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
                        <div className="basis-1/3 flex-1 ">
                            <img
                                className="rounded-lg object-cover"
                                src={logoWeb1}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={logoWeb2}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-fill"
                                src={logoWeb4}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={logoWeb6}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={logoWeb5}
                            />
                        </div>
                        <div className="basis-1/3 flex-1 lg:bg-orange-100">
                            <img
                                className="rounded-lg object-cover "
                                src={logoWeb3}
                            />
                        </div>
                    </div>
                </section>

            </main>

        </div>
    )
}