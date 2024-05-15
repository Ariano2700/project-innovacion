import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  UpdateAvatarProps,
  UserData,
  useUpdateProfileDataProps,
} from "../domain/types/userTypes";
import db from "../firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/storage";

const isValidFormData = (formData: UserData): boolean => {
  if (
    !formData.names ||
    !formData.lastnames ||
    !formData.dni ||
    !formData.phone_number
  ) {
    return false;
  }
  return true;
};

export const useUpdateProfileData = async ({
  uid,
  formData,
}: useUpdateProfileDataProps) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(userDocRef);

    console.log("Esto es antes del isValidFormData", formData);

    if (!isValidFormData(formData)) {
      throw new Error("Invalid form data");
    }
    console.log("Updating profile with data:", formData);

    if (docSnapshot.exists()) {
      // El usuario ya existe en la base de datos
      await updateDoc(userDocRef, formData);
    } else {
      // El usuario no existe en la base de datos, se crea con los nuevos datos
      await setDoc(userDocRef, formData);
    }
    console.log("Profile updated successfully");

    return true;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return false;
  }
};

export const updateAvatar = async ({
  file,
  userUid,
}: UpdateAvatarProps): Promise<string> => {
  const storageRef = ref(storage, `userAvatar/${userUid}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    throw new Error(error);
  }
};
