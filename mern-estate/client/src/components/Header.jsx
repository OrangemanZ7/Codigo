import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
	const { currentUser } = useSelector((state) => state.user)
	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">

				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-orange-600">Orange</span>
						<span className="text-orange-400">Soft</span>
					</h1>
				</Link>

				<form action="submit" className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input type="text" placeholder="Busca..." className="bg-transparent focus:outline-none w-24 sm:w-64" id="search" />
					<FaSearch className="text-slate-600" />
				</form>

				<ul className="flex gap-4 items-center" >

					<Link to="/">
						<li className="hidden sm:inline text-slate-700 hover:text-orange-600 cursor-pointer">
							Início
						</li>
					</Link>

					<Link to="/about">
						<li className="hidden sm:inline text-slate-700 hover:text-orange-600 cursor-pointer">
							Sobre
						</li>
					</Link>

					<Link to="/profile">
						{currentUser ? (
							<img className="rounded-full h-10 w-10 object-cover" src={currentUser.avatar} alt="profile" />
						) : (
							<li className="font-bold text-slate-900 hover:text-orange-600 cursor-pointer">Entrar</li>
						)}
					</Link>

				</ul>
			</div>
		</header>
	)
}
