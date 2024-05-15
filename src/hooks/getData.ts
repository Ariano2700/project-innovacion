import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firestore";

export const getData = async ({ uidUser }: { uidUser: string }) => {
    try {
      const userDocRef = doc(db, "users", uidUser);
      const querySnapshot = await getDoc(userDocRef);
      
      if(querySnapshot.exists()){
          const userData = querySnapshot.data();
          const role = userData?.role;
          const dni = userData?.dni
          const lastnames = userData?.lastnames
          const names = userData?.names
          const phone_number = userData?.phone_number
          const avatar_url = userData?.avatarUrl
          return {role, lastnames, dni, names, phone_number, avatar_url};
      }else{
          return null;
      }
    } catch (error: any) {
      throw new Error("Error al obtener el rol");
    }
  };