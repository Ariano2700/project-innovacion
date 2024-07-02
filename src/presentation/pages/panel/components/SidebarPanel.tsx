// Sidebar options
import SidebarOption from "./SidebarOption";
import sidebarOptions from "../../../protected-routes/panel-routes";
import logorandomXD from "../../../assets/img/randomimg.svg";

import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";

const SidebarPanel = () => {
  const { role } = useAuth();

  //Filtrar las opciones de la barra lateral según el rol del usuario
  //Filter sidebar options by user role
  const restrictedPath = ["register", "nuevo-recordatorio"];
  const filteredSidebarOptions = sidebarOptions.filter((option) => {
    if (role !== 1 && restrictedPath.includes(option.path)) {
      return false;
    }
    return true;
  });

  return (
    <aside className="drawer-side">
      <label
        htmlFor="drawer-panel"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <nav className="w-80 min-h-full bg-gray-200 dark:bg-[#181A1E] p-4 md:p-5">
        <div className="flex justify-center py-4">
          {/* <Link to="/panel">
            <img src={logorandomXD} alt="Logo de OMA" width={220} />
          </Link> */}
        </div>

        <ul className="flex flex-col gap-2">
          {filteredSidebarOptions.map(
            ({ path, label, Icon, children }, index) => (
              <SidebarOption
                path={path}
                key={index}
                label={label}
                Icon={Icon}
                children={children}
              />
            )
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPanel;
