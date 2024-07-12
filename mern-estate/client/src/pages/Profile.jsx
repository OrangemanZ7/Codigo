/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import OAuth from "../components/OAuth"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Perfil</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <img className="rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2 mb-2" src={currentUser.avatar} alt="profile" />

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          autoComplete="given-name"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          autoComplete="on"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          autoComplete="new-password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-40">
          {loading ? "Procesando..." : "Atualizar"}
        </button>

        <button
          disabled={loading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-40">
          Criar anúncio
        </button>
      
      </form>
      <div className="flex justify-between mt-3 p-2 text-red-600 font-bold cursor-pointer">
        <span>Eliminar conta</span>
        <span>Sair</span>        
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
