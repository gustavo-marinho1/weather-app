import { Link } from "react-router"

export const Header = () => {
  return (
    <header className="w-full min-h-[70px] flex items-center bg-gradient-to-br from-[#212121] to-[#222136]">

      <div className="px-5 lg:px-10">
        <Link to="/">
          <div className="text-lg font-semibold text-[#bdd7f0]">Weather App</div>
        </Link>
      </div>

    </header>
  )
}