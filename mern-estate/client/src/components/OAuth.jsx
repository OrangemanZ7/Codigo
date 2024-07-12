import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL } = result.user

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: displayName,
          email: email,
          photo: photoURL
        })
      })
      
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate("/")

    } catch (error) {
      console.log("Não foi possível logar com o Goole!", error)
    }
  }

  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Entrar com google</button>
  )
}
