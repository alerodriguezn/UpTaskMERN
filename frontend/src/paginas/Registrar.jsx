import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const Registrar = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: "Los Password no son iguales",
        error: true
      })
    }

    if(password.length < 6){
      setAlerta({
        msg: "Password muy corto, agrega mas caracteres",
        error: true
      })
    }

    setAlerta({})

    //Crear Usuario API

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
      
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  const { msg } = alerta


  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu Cuenta y Administra tus <span className='text-slate-700'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta} />}
      <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
          <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='nombre' value={nombre} onChange={e => setNombre(e.target.value)} type="text" placeholder='Ingresa tu nombre' />
        </div>

        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
          <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='email' value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Ingresa tu Email' />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
          <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='password' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Ingresa tu password' />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password2">Repetir Password</label>
          <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='password2' value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} type="password" placeholder='Ingresa tu password de nuevo' />
        </div>

        <input type="submit" value="Crear Cuenta" className='bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors' />
      </form>

      <nav className='lg:flex lg:justify-between '>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Ya tienes una cuenta? Inicia Sesion
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>

    </>
  )
}

export default Registrar