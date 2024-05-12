import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firestore";

export const getRole = async ({ uidUser }: { uidUser: string }) => {
    try {
      const userDocRef = doc(db, "users", uidUser);
      const querySnapshot = await getDoc(userDocRef);
      
      if(querySnapshot.exists()){
          const userData = querySnapshot.data();
          const role = userData?.role;
          return role;
      }else{
          return null;
      }
    } catch (error: any) {
      throw new Error("Error al obtener el rol");
    }
  };