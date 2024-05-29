import MaterialSymbolsMenuRounded from "../../../components/icons/material-symbols/MaterialSymbolsMenuRounded";
import SolarUserOutline from "../../../components/icons/solar/SolarUserOutline";
import { useAuth } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";

const NavbarPanel = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/iniciar-sesion");
  };

  return (
    <nav className="container mx-auto flex justify-between p-2 md:py-4">
      <label htmlFor="drawer-panel" className="btn btn-square btn-primary">
        <MaterialSymbolsMenuRounded className="text-2xl text-secondary" />
      </label>

      <div className="flex gap-2">
        <div className="flex items-center gap-5">
          <details className="dropdown dropdown-end">
            <summary
              className={`w-10 h-10 p-0 rounded-full flex items-center justify-center bg-secondary cursor-pointer btn}`}
            >
              {<SolarUserOutline className="text-xl text-primary" />}
            </summary>
            <ul className="p-2 shadow-md menu dropdown-content z-[1] bg-secondary rounded-box w-52">
              <li>
                <a
                  className="btn btn-outline btn-primary justify-start"
                  onClick={handleLogOut}
                >
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPanel;
