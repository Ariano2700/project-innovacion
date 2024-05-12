const useRoleName = ({ roleNumber }: { roleNumber: number | null }) => {
    if (roleNumber !== null) {
      const roleName:{[key:number]: string} = {
        1: "Administrador",
        2: "Usuario",
        3: "Visualizador",
      };
      return roleName[roleNumber] || "Rol desconocido";
    } else {
      return "Rol desconocido";
    }
  };
  export default useRoleName;