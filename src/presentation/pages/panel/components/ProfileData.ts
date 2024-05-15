import {
  UserDataFieldType,
  useUserDataProps,
} from "../../../../domain/types/userTypes";
import { useUserData } from "../../../../hooks/useUserData";

export const ProfileData = ({ user }: useUserDataProps) => {
  const userData = useUserData({ user: user });
  const userFields: UserDataFieldType[] = [
    {
      label: "Nombres",
      value: userData?.names || "No tiene nombres",
      name: "names",
    },
    {
      label: "Apellidos",
      value: userData?.lastnames || "No tiene apellidos",
      name: "lastnames",
    },
    {
      label: "Teléfono",
      value: userData?.phone_number || "No tiene número de telefono",
      name: "phone_number",
    },
    { label: "DNI", value: userData?.dni || "No tiene DNI", name: "dni" },
  ];
  return { userData, userFields };
};
