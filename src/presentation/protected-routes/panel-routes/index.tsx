// import { MaterialSymbolsLightAccountCircleOutline } from "../../components/icons/material-symbols-light/MaterialSymblosLightAccountCircleOutline ";
// import { MaterialSymbolsLightSettingsAccountBoxOutlineRounded } from "../../components/icons/material-symbols-light/MaterialSymbolsLightSettingsAccountBoxOutlineRounded";
// import { MaterialSymbolsLightAccountBoxOutline } from "../../components/icons/material-symbols-light/MaterialSymbolsLihtAccountBoxOutline";
// import { MaterialSymbolsAssignmentAddOutlineRounded } from "../../components/icons/material-symbols/MaterialSymbolsAssignmentAddOutlineRounded";
import MaterialSymbolsHomeOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsHomeOutlineRounded";
// import { MaterialSymbolsListAltOutlineRounded } from "../../components/icons/material-symbols/MaterialSymbolsListAltOutlineRounded";
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
    path: "participantes-todos",
    label: "Mostrar todos los participantes",
    Icon: SolarUsersGroupRoundedLinear,
  },
];

export default sidebarOptions;
