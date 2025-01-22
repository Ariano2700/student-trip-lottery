import { MaterialSymbolsLightFormatListNumbered } from "../../components/icons/material-symbols-light/MaterialSymbolsLightFormatListNumbered";
import MaterialSymbolsHomeOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsHomeOutlineRounded";
import SolarUsersGroupRoundedLinear from "../../components/icons/solar/SolarUsersGroupRoundedLinear";
type SidebarOption = {
  path: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: SidebarOption[];
};

const sidebarOptions: SidebarOption[] = [
  {
    path: "inicio",
    label: "Inicio",
    Icon: MaterialSymbolsHomeOutlineRounded,
  },
  {
    path: "numeros-faltantes",
    label: "Rifas faltantes",
    Icon: MaterialSymbolsLightFormatListNumbered,
  },
  {
    path: "todos-los-participantes",
    label: "Todas las rifas ocupadas",
    Icon: SolarUsersGroupRoundedLinear,
  },
  {
    path: "seleccion-multiple",
    label: "Selección multiple de rifas",
    Icon: MaterialSymbolsLightFormatListNumbered,
  },
];

export default sidebarOptions;
