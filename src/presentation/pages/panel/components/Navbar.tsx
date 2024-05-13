import MaterialSymbolsMenuRounded from "../../../components/icons/material-symbols/MaterialSymbolsMenuRounded";
import SolarUserOutline from "../../../components/icons/solar/SolarUserOutline";
import { useAuth } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./theme-toggle/ToggleTheme";

type ToggleThemeProps = {
  theme: string;
  handleChangeTheme: () => void;
};


const NavbarPanel = ({ handleChangeTheme, theme }: ToggleThemeProps) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/iniciar-sesion");
    setTimeout(() => {
      logOut();
    }, 500);
  };

  return (
    <nav className="container mx-auto flex justify-between p-2 md:py-4">
      <label htmlFor="drawer-panel" className="btn btn-square btn-primary">
        <MaterialSymbolsMenuRounded className="text-2xl" />
      </label>

      <div className="flex gap-2">
        <div className="flex items-center gap-5">
          <ToggleTheme handleChangeTheme={handleChangeTheme} theme={theme}/>
          <details className="dropdown dropdown-end">
            <summary className="btn w-10 h-10 p-0 rounded-full flex items-center justify-center bg-gray-300">
              <SolarUserOutline className="text-xl" />
            </summary>
            <ul className="p-2 shadow-md menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a
                  className="btn btn-outline btn-error justify-start"
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
