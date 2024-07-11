import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Novo Usuário</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          autoComplete="given-name"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          autoComplete="new-password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-40">Sign up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Já tem uma conta?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Entrar</span>
        </Link>
      </div>
    </div>
  )
}
