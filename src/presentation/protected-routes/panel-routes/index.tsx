import CarbonAnalytics from "../../components/icons/carbon/CarbonAnalytics";
import { MaterialSymbolsLightAccountCircleOutline } from "../../components/icons/material-symbols-light/MaterialSymblosLightAccountCircleOutline ";
import { MaterialSymbolsLightSettingsAccountBoxOutlineRounded } from "../../components/icons/material-symbols-light/MaterialSymbolsLightSettingsAccountBoxOutlineRounded";
import { MaterialSymbolsLightAccountBoxOutline } from "../../components/icons/material-symbols-light/MaterialSymbolsLihtAccountBoxOutline";
import { MaterialSymbolsAssignmentAddOutlineRounded } from "../../components/icons/material-symbols/MaterialSymbolsAssignmentAddOutlineRounded";
import MaterialSymbolsHomeOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsHomeOutlineRounded";
import { MaterialSymbolsListAltOutlineRounded } from "../../components/icons/material-symbols/MaterialSymbolsListAltOutlineRounded";
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
    path: "recordatorios-todos",
    label: "Todos los recordatorios",
    Icon: MaterialSymbolsListAltOutlineRounded,
  },
  {
    path: "nuevo-recordatorio",
    label: "Añadir recordatorio",
    Icon: MaterialSymbolsAssignmentAddOutlineRounded,
  },
  {
    path: "usuario",
    label: "Usuario",
    Icon: MaterialSymbolsLightAccountBoxOutline,
    children: [
      {
        path: "perfil",
        label: "Perfil",
        Icon: MaterialSymbolsLightAccountCircleOutline,
      },
      {
        path: "actualizar-perfil",
        label: "Actualizar perfil",
        Icon: MaterialSymbolsLightSettingsAccountBoxOutlineRounded,
      },
    ],
  },
  {
    path: "register",
    label: "Registrar usuario",
    Icon: SolarUsersGroupRoundedLinear,
  },
  {
    path: "estadisticas",
    label: "Estadisticas ingresos y egresos",
    Icon: CarbonAnalytics,
  },
];

export default sidebarOptions;
