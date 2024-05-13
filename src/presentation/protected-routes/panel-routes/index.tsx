import { useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import PhHeartbeatBold from "../../components/icons/Phosphor/PhHeartbeatBold";
import MaterialSymbolsLightFinanceRounded from "../../components/icons/material-symbols-light/MaterialSymbolsLightFinanceRounded";
import MaterialSymbolsHomeOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsHomeOutlineRounded";
import MaterialSymbolsLocalHospitalOutlineRounded from "../../components/icons/material-symbols/MaterialSymbolsLocalHospitalOutlineRounded";
import SolarUsersGroupRoundedLinear from "../../components/icons/solar/SolarUsersGroupRoundedLinear";
type SidebarOption = {
  path: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: SidebarOption[];
};
export const roleNumber = () => {
  const { role } = useAuth();
  return role;
};
const sidebarOptions: SidebarOption[] = [
  {
    path: "inicio",
    label: "Inicio",
    Icon: MaterialSymbolsHomeOutlineRounded,
  },
  // {
  //   path: 'animales',
  //   label: 'Animales',
  //   Icon: MaterialSymbolsLocalHospitalOutlineRounded,
  //   children: [
  //     {
  //       path: 'zoologico',
  //       label: 'Zoológico',
  //     },
  //     {
  //       path: 'canes',
  //       label: 'Canes',
  //     },
  //     {
  //       path: 'equinos',
  //       label: 'Equinos',
  //     },
  //   ],
  // },
  // {
  //   path: 'salud',
  //   label: 'Salud y bienestar',
  //   Icon: PhHeartbeatBold,
  //   children: [
  //     {
  //       path: 'cuidadores',
  //       label: 'Cuidadores',
  //     },
  //     {
  //       path: 'alimentacion',
  //       label: 'Alimentación',
  //     },
  //     {
  //       path: 'historia-clinica',
  //       label: 'Historia clínica',
  //     },
  //   ]
  // },
  // {
  //   path: 'finanzas',
  //   label: 'Finanzas', // Finanzas y Recaudación de Fondos
  //   Icon: MaterialSymbolsLightFinanceRounded,
  //   children: [
  //     {
  //       path: 'donaciones',
  //       label: 'Donaciones',
  //     },
  //     {
  //       path: 'productos',
  //       label: 'Inventario de productos',
  //     },
  //   ]
  // },

    {
      path: 'register',
      label: 'Registrar',
      Icon: SolarUsersGroupRoundedLinear,
    },
  ];


export default sidebarOptions;
