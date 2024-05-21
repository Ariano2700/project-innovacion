import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/authContext";
import Card from "../../../../components/Card";
import MaterialSymbolsEditOutlineRounded from "../../../../components/icons/material-symbols/MaterialSymbolsEditOutlineRounded";
import { ProfileData } from "../../components/ProfileData";
import { UserData } from "../../../../../domain/types/userTypes";
import {
  handleChangeType,
  handleSubmitType,
} from "../../../../../domain/types/formTypes";
import {
  updateAvatar,
  useUpdateProfileData,
} from "../../../../../hooks/useUpdateProfileData";
import InputForm from "../../../outsite/components/InputForm";
import { useNavigate } from "react-router-dom";
import { SavedAlert } from "../../../../components/alerts/SavedAlert";
import { getData } from "../../../../../hooks/getData";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    "https://picsum.photos/200"
  );
  const userData = ProfileData({ user: user });
  const [formData, setFormData] = useState<UserData>({
    names: "",
    lastnames: "",
    dni: "",
    phone_number: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userData = await getData({ uidUser: user?.uid });
          if (userData) {
            setFormData(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user?.uid]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadImg(file);
      setPreviewUrl(URL.createObjectURL(file)); // Genera una URL de previsualización
    }
  };

  const handleInputChange: handleChangeType = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    const uid = user?.uid as string;

    let updatedAvatarUrl = userData.userData.avatarUrl;
    // console.log("URL del avatar actual", updatedAvatarUrl)
    if (uploadImg) {
      try {
        const newAvatarUrl = await updateAvatar({
          file: uploadImg,
          userUid: uid,
        });
        console.log(newAvatarUrl);
        updatedAvatarUrl = newAvatarUrl;
      } catch (error) {
        console.error("Error updating avatar:", error);
        return;
      }
    }

    // Crear un objeto con los datos actualizados del formulario
    const updatedFormData = {
      names: formData.names,
      lastnames: formData.lastnames,
      dni: formData.dni,
      phone_number: formData.phone_number,
      avatarUrl: updatedAvatarUrl, // Usar la nueva URL si se actualizó, de lo contrario, la URL existente
    };
    // console.log("Console log despues de updatedFormData", updatedAvatarUrl)
    try {
      console.log("Updating profile with data:", updatedFormData);
      SavedAlert({ title: "Información actualizada" });
      await useUpdateProfileData({ uid, formData: updatedFormData });
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-96 max-w-full flex flex-col p-10 gap-4">
        <div className="inline-block mx-auto relative">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={
                uploadImg
                  ? previewUrl
                  : userData && userData.userData.avatarUrl
                  ? userData.userData.avatarUrl
                  : "https://picsum.photos/200"
              }
              alt="profile"
            />
          </div>

          <label
            htmlFor="edit-photo"
            className="btn btn-sm btn-circle bg-white absolute top-0 right-0 text-gray-700 text-lg shadow-md"
          >
            <input
              type="file"
              id="edit-photo"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <MaterialSymbolsEditOutlineRounded />
          </label>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {userData && userData.userData.names && userData.userData.lastnames
            ? `${userData.userData.names.split(" ")[0]} ${
                userData.userData.lastnames.split(" ")[0]
              }`
            : user?.email}
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {userData.userFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg py-2 px-3"
            >
              <label
                htmlFor={field.name}
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                {field.label}
              </label>
              <InputForm
                type="text"
                name={field.name}
                value={formData[field.name as keyof UserData]}
                minLength={
                  field.name === "phone_number"
                    ? 9
                    : field.name === "dni"
                    ? 8
                    : undefined
                }
                maxLength={
                  field.name === "phone_number"
                    ? 9
                    : field.name === "dni"
                    ? 8
                    : undefined
                }
                onChange={handleInputChange}
                styleProp="rounded border bg-gray-50 border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>
          ))}
          <button className="bg-primary text-white border border-primary border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-white  absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Actualizar
          </button>
        </form>
      </Card>
    </div>
  );
};
export default ProfileUpdate;
