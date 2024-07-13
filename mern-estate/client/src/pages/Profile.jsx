/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { app } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

import OAuth from "../components/OAuth"

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [ file, setFile ] = useState(undefined)
  const [ fileUploadPerc, setFileUploadPerc ] = useState(0)
  const [ fileUploadError, setFileUploadError ] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(file) {      
      handleFileUpload(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleFileUpload = (file) => {
    setFileUploadError(false)    
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFileUploadPerc(Math.round(progress))        
      },
      (error) => {        
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL})            
        })
    })
  }
  
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

        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-4 mb-4"
          src={formData.avatar || currentUser.avatar} alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <div className="flex flex-col text-center">
              <span className="text-red-600 font-bold">Erro ao carregar a imagem!</span>
              <span className="text-red-500">!!! O arquivo deve ser menor que 2Mb !!!</span>
            </div>
          ) :
            fileUploadPerc > 0 && fileUploadPerc <100 ? (
              <span className="text-slate-600">{fileUploadPerc}%</span>
            ) : fileUploadPerc === 100 ? (
              <span className="text-green-700 font-bold">Imagem carregada com sucesso!</span>
          ) : (
              ""
          )}
        </p>

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
