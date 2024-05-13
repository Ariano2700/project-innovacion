import { Outlet } from "react-router-dom";
import NavbarPanel from "./components/Navbar";
import SidebarPanel from "./components/SidebarPanel";
import { useEffect, useState } from "react";

const PanelWrapper = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Almacena el tema seleccionado en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  // Aplica el tema seleccionado al cuerpo del documento
  const applyTheme = (selectedTheme:String) => {
    if (selectedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme); // Aplica el nuevo tema al cuerpo del documento
      return newTheme;
    });
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
        <NavbarPanel handleChangeTheme={handleChangeTheme} theme={theme}/>
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
