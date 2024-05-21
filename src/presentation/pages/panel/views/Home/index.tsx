import { useAuth } from "../../../../../context/authContext";
import useRoleData from "../../../../../hooks/useRoleData";
import { ProfileData } from "../../components/ProfileData";
import TasksRemindersBase from "../../components/TasksRemindersBase";
const HomePage = () => {
  const { role, user } = useAuth();
  const userData = ProfileData({ user: user });
  const roleData = useRoleData({ roleNumber: role });

  return (
    <>
      <div className="w-full flex flex-col items-center gap-5">
        <h1 className="text-3xl">ESTA ES LA PAGINA DE HOME</h1>
        <h1 className="text-2xl">
          {userData.userData.names && userData.userData.lastnames
            ? `${userData.userData.names} ${userData.userData.lastnames}`
            : user?.email}
        </h1>
        <div className="text-2xl gap-5 p-5 flex justify-between items-center bg-slate-500 rounded-lg">
          {role && roleData?.icon ? roleData?.icon && <roleData.icon /> : ""}
          <h1 className="text-2xl">
            {role ? roleData?.label : "No tiene rol"}
          </h1>
        </div>
      </div>
      {/*EJEMPLOS DE RECORDATORIOS DE TAREA (BETA)*/}
      <div className="flex flex-col items-end">
        <TasksRemindersBase />
      </div>
    </>
  );
};
export default HomePage;
