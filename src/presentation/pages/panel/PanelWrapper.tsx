import { Outlet } from "react-router-dom";
import NavbarPanel from "./components/Navbar";
import SidebarPanel from "./components/SidebarPanel";

const PanelWrapper = () => {
  // Aplica el tema seleccionado al cuerpo del documento
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
      className={`drawer bg-[#181A1E] text-white z-10`}
      onClick={closeAllDetails}
    >
      <input id="drawer-panel" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content min-h-screen">
        <NavbarPanel />
        <div className="container mx-auto p-2">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <SidebarPanel />
      <div className="logoStyles absolute inset-0 -z-10 opacity-10"></div>
    </div>
  );
};
export default PanelWrapper;
