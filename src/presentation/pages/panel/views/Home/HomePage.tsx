import { useAuth } from "../../../../../context/authContext";
import useRoleName from "../../../../../hooks/useRoleName";

const HomePage = () => {
  const { role, user } = useAuth();
  console.log(role);
  console.log(user?.email);
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-6xl">ESTA ES LA PAGINA DE HOME</h1>
        <h1 className="text-4xl">{user?.email}</h1>
        <h1 className="text-4xl">{role ? useRoleName({roleNumber:role}): "No tiene rol"}</h1>
      </div>
    </>
  );
};
export default HomePage;
