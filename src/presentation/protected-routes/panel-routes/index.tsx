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
    path: "stickers-faltantes",
    label: "Números de stickers faltantes",
    Icon: MaterialSymbolsLightFormatListNumbered
  },
  {
    path: "stickers-all",
    label: "Mostrar todos los stickers",
    Icon: SolarUsersGroupRoundedLinear,
  },
];

export default sidebarOptions;
