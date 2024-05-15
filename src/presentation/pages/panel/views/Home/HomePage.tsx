import { useAuth } from "../../../../../context/authContext";
import useRoleName from "../../../../../hooks/useRoleName";
import { ProfileData } from "../../components/ProfileData";

const HomePage = () => {
  const { role, user } = useAuth();
  const userData = ProfileData({user: user})
  // console.log(role);
  // console.log(user?.email);
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-6xl">ESTA ES LA PAGINA DE HOME</h1>
        <h1 className="text-4xl">{userData.userData.names && userData.userData.lastnames ? `${userData.userData.names} ${userData.userData.lastnames}` : user?.email}</h1>
        <h1 className="text-4xl">{role ? useRoleName({roleNumber:role}): "No tiene rol"}</h1>
      </div>
    </>
  );
};
export default HomePage;
