import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos()

  const params = useParams()



  useEffect(() => {
    if (params.id){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
      setCliente(proyecto.cliente)

    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    //Pasar los datos al provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

    setId(null)
    setNombre("")
    setDescripcion("")
    setFechaEntrega("")
    setCliente("")
  }

  const { msg } = alerta;

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre del Proyecto"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripcion</label>
        <textarea
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="descripcion"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripcion del Proyecto"
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>
        <input
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="fecha-entrega"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre Cliente</label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
          placeholder="Cliente"
        />
      </div>

      <input
        type="submit"
        value={id ? "Actualizar Proyeto" : "Crear Proyecto"}
        className="bg-sky-600 w-full p-3 font-bold text-white uppercase rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />


    </form>

  )
}

export default FormularioProyecto