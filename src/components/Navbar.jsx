import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `inline-block border border-white rounded-[5px] px-[10px] py-[5px] text-[18px] font-semibold text-center transition-all duration-200 hover:shadow-[0_8px_15px_rgba(0,0,0,0.25)] active:shadow-none ${
      isActive
        ? "bg-white text-[#3212a5]"
        : "bg-transparent text-white hover:bg-[#1f0a6b]"
    }`;

  return (
    <header>
      <nav className="bg-[#3212a5] py-[0.6em]">
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-white text-2xl font-bold">
              Patisserie Plain
            </Link>
          </div>  

          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={navLinkClass}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
