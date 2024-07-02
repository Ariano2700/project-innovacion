import {MaterialSymbolsAdminPanelSettingsOutline} from '../presentation/components/icons/material-symbols/MaterialSymbolsAdminPanelSettingsOutline'
import { MaterialSymbolsLockOpenOutlineRounded } from '../presentation/components/icons/material-symbols/MaterialSymbolsLockOpenOutlineRounded';
type roleName = {
  label: string,
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}
const useRoleData = ({ roleNumber } : { roleNumber: number | null }) => {
    if (roleNumber !== null) {
      const roleName:{ [key: number]: roleName } = {
        1: {label: "Administrador", icon:MaterialSymbolsAdminPanelSettingsOutline},
        2: {label: "Usuario", icon: MaterialSymbolsLockOpenOutlineRounded},
      };
      return roleNumber !== null ? roleName[roleNumber] || { label: "Rol desconocido" } : { label: "Rol desconocido" };
    } 
  };
  export default useRoleData;