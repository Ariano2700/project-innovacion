import { useEffect, useState } from "react";
import { getData } from "./getData";
import { UserData, useUserDataProps } from "../domain/types/userTypes";

export const useUserData = ({ user }: useUserDataProps) => {
  const userUid = user?.uid as string;
  const [userData, setUserData] = useState<UserData>({});
  useEffect(() => {
    const fetchUserData = async () => {
      setTimeout(async () => {
        try {
          const data = await getData({ uidUser: userUid });
          setUserData({
            dni: data?.dni,
            lastnames: data?.lastnames,
            names: data?.names,
            phone_number: data?.phone_number,
            avatarUrl: data?.avatar_url
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }, 600);
    };

    fetchUserData();
    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, [userUid]);
  return userData;
};
