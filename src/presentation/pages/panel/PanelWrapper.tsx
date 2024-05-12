import { Outlet } from "react-router-dom";
import NavbarPanel from "./components/Navbar";
import SidebarPanel from "./components/SidebarPanel";

const PanelWrapper = () => {

  const closeAllDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const details = document.querySelectorAll("details[open]");

    details.forEach((detail) => {
      if (!detail.contains(e.target as Node)) {
        detail.removeAttribute("open");
      }
    });
  };

  return (
    <div className={`drawer bg-[#1f2328]`} onClick={closeAllDetails}>
      <input id='drawer-panel' type='checkbox' className='drawer-toggle' />
      
      {/* Content */}
      <div className='drawer-content min-h-screen'>
        <NavbarPanel />
        <div className='container mx-auto p-2'>
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <SidebarPanel />
    </div>
  );
};
export default PanelWrapper;
