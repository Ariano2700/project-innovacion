import { Outlet } from "react-router-dom";
import NavbarPanel from "./components/Navbar";
import SidebarPanel from "./components/SidebarPanel";
import { useEffect, useState } from "react";

const PanelWrapper = () => {
  const [theme, setTheme] = useState(() =>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      return "dark"
    }
    return "light"
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const closeAllDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const details = document.querySelectorAll("details[open]");

    details.forEach((detail) => {
      if (!detail.contains(e.target as Node)) {
        detail.removeAttribute("open");
      }
    });
  };
  //"bg-[#1f2328]" : "bg-gray-200"
  return (
    <div
      className={`drawer bg-gray-200 dark:bg-[#1f2328] dark:text-white text-black`}
      onClick={closeAllDetails}
    >
      <input id="drawer-panel" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content min-h-screen">
        <NavbarPanel handleChangeTheme={handleChangeTheme}/>
        <div className="container mx-auto p-2">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <SidebarPanel />
    </div>
  );
};
export default PanelWrapper;
