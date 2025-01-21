// Sidebar options
import SidebarOption from "./SidebarOption";
import sidebarOptions from "../../../protected-routes/panel-routes";
import bandera from "../../../../../public/canada_bandera.png";

import { Link, NavLink } from "react-router-dom";
import { MaterialSymbolsSearch } from "../../../components/icons/material-symbols/MaterialSymbolsSearch";

const SidebarPanel = () => {
  return (
    <aside className="drawer-side">
      <label
        htmlFor="drawer-panel"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <nav className="w-80 min-h-full  bg-[#181A1E] p-4 md:p-5">
        <div className="flex justify-center py-4">
          <Link to="/panel">
            <img src={bandera} alt="Logo" width={220} />
          </Link>
        </div>

        <ul className="flex flex-col gap-2">
          {sidebarOptions.map(({ path, label, Icon, children }, index) => (
            <SidebarOption
              path={path}
              key={index}
              label={label}
              Icon={Icon}
              children={children}
            />
          ))}
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                [
                  "btn btn-md btn-ghost w-full gap-2 justify-start",
                  isActive
                    ? "!bg-primary text-secondary"
                    : "text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-gray-700",
                ].join(" ")
              }
            >
              <MaterialSymbolsSearch className="text-xl" />
              <span>Busqueda de N° rifa</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPanel;
