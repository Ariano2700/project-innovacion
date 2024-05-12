import { doc, setDoc } from "firebase/firestore";
import db from "../firebase/firestore";

type setRoleType = {
    uId: string;
    role: number;
  };
  
  export const setRole = async ({role, uId}:setRoleType) => {
    try {
      await setDoc(doc(db,"users",uId),{
        role: role,
      })
      console.log("Documento agregado correctamente a la colección 'users'");
    } catch (error) {
      console.error(
        "Error al agregar el documento a la colección 'users':",
        error
      );
      throw new Error("Error al guardar UID en la colección");
    }
  };