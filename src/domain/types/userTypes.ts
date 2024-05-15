import { User } from "firebase/auth";

export type UserData = {
  dni?: string;
  lastnames?: string;
  names?: string;
  phone_number?: string;
  role?: string;
  avatarUrl?: string
};

export type useUserDataProps = {
  user: User | null;
};

export type UserDataFieldType = {
  label: string;
  value: string;
  name: string
};

export type useUpdateProfileDataProps = {
  uid: string,
  formData: UserData
}
export type UpdateAvatarProps = {
  file: File;
  userUid: string;
};