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
    label: "Números de rifa faltantes",
    Icon: MaterialSymbolsLightFormatListNumbered
  },
  {
    path: "participantes-todos",
    label: "Mostrar todos los participantes",
    Icon: SolarUsersGroupRoundedLinear,
  },
];

export default sidebarOptions;
