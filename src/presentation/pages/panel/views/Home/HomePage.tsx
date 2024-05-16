import { useAuth } from "../../../../../context/authContext";
import useRoleData from "../../../../../hooks/useRoleData";
import { ProfileData } from "../../components/ProfileData";

const HomePage = () => {
  const { role, user } = useAuth();
  const userData = ProfileData({user: user})
  const roleData = useRoleData({roleNumber:role});

  // console.log(role);
  // console.log(user?.email);
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-6xl">ESTA ES LA PAGINA DE HOME</h1>
        <h1 className="text-4xl">{userData.userData.names && userData.userData.lastnames ? `${userData.userData.names} ${userData.userData.lastnames}` : user?.email}</h1>
        <div className="text-4xl gap-5 p-5 flex justify-between items-center bg-slate-500 rounded-lg">
          {role && roleData?.icon ? roleData?.icon && <roleData.icon/>: ''}
        <h1 className="text-4xl">{role ? roleData?.label: "No tiene rol"}</h1>
        </div>
      </div>
    </>
  );
};
export default HomePage;
