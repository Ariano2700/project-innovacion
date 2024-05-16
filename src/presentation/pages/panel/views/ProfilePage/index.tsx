import { Link } from "react-router-dom";
import { useAuth } from "../../../../../context/authContext";
import { formatPhoneNumber } from "../../../../../hooks/formatPhoneNumber";
import useRoleData from "../../../../../hooks/useRoleData";
import Card from "../../../../components/Card";

// Icons
import { ProfileData } from "../../components/ProfileData";

const ProfilePage = () => {
  const { user, role } = useAuth();
  const roleData = useRoleData({ roleNumber: role });
  const userData = ProfileData({ user: user });

  return (
    <div className="flex justify-center">
      <Card className="w-96 max-w-full flex flex-col p-10 gap-4">
        <div className="inline-block mx-auto relative">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={
                userData && userData.userData.avatarUrl
                  ? `${userData.userData.avatarUrl}`
                  : "https://picsum.photos/200"
              }
              alt="profile"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {userData && userData.userData.names && userData.userData.lastnames
            ? `${userData.userData.names.split(" ")[0]} ${
                userData.userData.lastnames.split(" ")[0]
              }`
            : user?.email}
        </h2>

        {/* Datos como: Correo, teléfono, etc. */}
        {userData.userFields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg py-2 px-3"
          >
            <p className="text-gray-500 text-xs">{field.label}</p>
            <p className="text-gray-800">
              {field.name === "phone_number"
                ? formatPhoneNumber({ phoneNumber: field.value })
                : field.value}
            </p>
          </div>
        ))}
        <div className="flex flex-col bg-secondary border-gray-200 rounded-lg py-2 px-3">
          {/* <p className="text-gray-200 text-xs">Rol</p> */}
          <p className="text-primary-content flex items-center gap-2 justify-center">
            <span>{role ? roleData?.icon && <roleData.icon className="text-2xl"/> : ""}</span>
            <span>{role ? roleData?.label : "Rol desconocido"}</span>
          </p>
        </div>
        <Link to={"/panel/usuario/actualizar-perfil"}>
          <div className="flex justify-center">
            <button className="w-[50%] bg-primary text-white border border-primary border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-white  absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Actualizar perfil
            </button>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default ProfilePage;
