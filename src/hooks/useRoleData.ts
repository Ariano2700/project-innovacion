import {MaterialSymbolsAdminPanelSettingsOutline} from '../presentation/components/icons/material-symbols/MaterialSymbolsAdminPanelSettingsOutline'
import { MaterialSymbolsEyeTrackingOutlineRounded } from '../presentation/components/icons/material-symbols/MaterialSymbolsEyeTrackingOutlineRounded';
import { MaterialSymbolsLockOpenOutlineRounded } from '../presentation/components/icons/material-symbols/MaterialSymbolsLockOpenOutlineRounded';
type roleName = {
  label: string,
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}
const useRoleData = ({ roleNumber }: { roleNumber: number | null }) => {
    if (roleNumber !== null) {
      const roleName:{ [key: number]: roleName } = {
        1: {label: "Administrador", icon:MaterialSymbolsAdminPanelSettingsOutline},
        2: {label: "Usuario", icon: MaterialSymbolsLockOpenOutlineRounded},
        3: {label: "Visualizador", icon: MaterialSymbolsEyeTrackingOutlineRounded},
      };
      return roleNumber !== null ? roleName[roleNumber] || { label: "Rol desconocido" } : { label: "Rol desconocido" };
    } 
  };
  export default useRoleData;