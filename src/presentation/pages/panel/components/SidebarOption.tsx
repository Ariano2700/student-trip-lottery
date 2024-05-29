import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDownSLine } from "../../../components/icons/remix-icon/RiArrowDownSLine";

type SidebarOptionProps = {
  path: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: SidebarOptionProps[];
};

const SidebarOption = ({ path, label, Icon, children }: SidebarOptionProps) => {

  const [isRotated, setIsRotated] = useState<boolean>(false);

  const closeSidebar = () => {
    const sidebar = document.getElementById("drawer-panel") as HTMLInputElement;
    sidebar.checked = false;
  };
  return (
    <li className="">
      {children ? (
        <details className="collapse rounded-none">
          <summary onClick={() => setIsRotated(prevState => !prevState)} className="collapse-title btn btn-md py-0 !flex items-center btn-ghost w-full gap-2 justify-between text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-700">
            <div className="flex justify-center items-center gap-2">
              {Icon && <Icon className="text-xl items-center" />}
              <span>{label}</span>
            </div>
            <RiArrowDownSLine className={`text-xl ${isRotated ? 'rotate-clockwise' : 'rotate-counterclockwise'}`}/>
          </summary>
          <div className="collapse-content px-0">
            <ul>
              {children.map((child) => (
                <NavLink
                  key={child.path}
                  to={`/panel/${path}/${child.path}`}
                  className={({ isActive }) =>
                    [
                      "btn btn-md btn-ghost w-full ps-11 gap-2 justify-start mt-1",
                      isActive
                        ? "!bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-700",
                    ].join(" ")
                  }
                  onClick={closeSidebar}
                >
                  {child.Icon && <child.Icon className="text-xl" />}
                  <span>{child.label}</span>
                </NavLink>
              ))}
            </ul>
          </div>
        </details>
      ) : (
        <NavLink
          to={`/panel/${path}`}
          className={({ isActive }) =>
            [
              "btn btn-md btn-ghost w-full gap-2 justify-start",
              isActive
                ? "!bg-primary text-secondary"
                : "text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-gray-700",
            ].join(" ")
          }
          onClick={closeSidebar}
        >
          {Icon && <Icon className="text-xl" />}
          <span>{label}</span>
        </NavLink>
      )}
    </li>
  );
};
export default SidebarOption;
