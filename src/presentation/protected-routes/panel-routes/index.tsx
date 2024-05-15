import { MaterialSymbolsLightAccountCircleOutline } from "../../components/icons/material-symbols-light/MaterialSymblosLightAccountCircleOutline ";
import { MaterialSymbolsLightSettingsAccountBoxOutlineRounded } from "../../components/icons/material-symbols-light/MaterialSymbolsLightSettingsAccountBoxOutlineRounded";
import { MaterialSymbolsLightAccountBoxOutline } from "../../components/icons/material-symbols-light/MaterialSymbolsLihtAccountBoxOutline";
import MaterialSymbolsHomeOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsHomeOutlineRounded";
import MaterialSymbolsLocalHospitalOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsLocalHospitalOutlineRounded";
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
    path: "prueba",
    label: "Deyvis chupalo",
    Icon: MaterialSymbolsLocalHospitalOutlineRounded,
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
    label: "Registrar",
    Icon: SolarUsersGroupRoundedLinear,
  },
];

export default sidebarOptions;
