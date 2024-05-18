import { useAuth } from "../../../../../context/authContext";
import { TaskReminderProps } from "../../../../../domain/types/taskTypes";
import useRoleData from "../../../../../hooks/useRoleData";
import { ProfileData } from "../../components/ProfileData";
import TaskReminder from "../../components/TaskReminder";

const HomePage = () => {
  const { role, user } = useAuth();
  const userData = ProfileData({ user: user });
  const roleData = useRoleData({ roleNumber: role });

  // console.log(role);
  // console.log(user?.email);
  const reminders: TaskReminderProps[] = [
    // {
    //   reminder: "Realizar navbar",
    //   timeSet: "publicado hace 2 hora(s)",
    // },
    // {
    //   reminder: "Actualizar el pie de página",
    //   timeSet: "publicado hace 16 minutos",
    // },
    // {
    //   reminder: "Corregir errores en el formulario de contacto",
    //   timeSet: "publicado hace 25 minutos",
    // },
    // {
    //   reminder: "Agregar nueva sección de testimonios",
    //   timeSet: "publicado hace 4 hora(s)",
    // },
    // {
    //   reminder: "Implementar autenticación de usuarios",
    //   timeSet: "publicado hace 45 minutos",
    // },
  ];
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-6xl">ESTA ES LA PAGINA DE HOME</h1>
        <h1 className="text-4xl">
          {userData.userData.names && userData.userData.lastnames
            ? `${userData.userData.names} ${userData.userData.lastnames}`
            : user?.email}
        </h1>
        <div className="text-4xl gap-5 p-5 flex justify-between items-center bg-slate-500 rounded-lg">
          {role && roleData?.icon ? roleData?.icon && <roleData.icon /> : ""}
          <h1 className="text-4xl">
            {role ? roleData?.label : "No tiene rol"}
          </h1>
        </div>
      </div>
      {/*EJEMPLOS DE RECORDATORIOS DE TAREA (BETA)*/}
      {/* <div className="flex flex-col flex-wrap justify-around gap-5 mb-3 mt-3">
        {reminders
          ? reminders.map((task, index) => (
              <TaskReminder
                key={index}
                reminder={task.reminder}
                timeSet={task.timeSet}
              />
            ))
          : ""}
      </div> */}
    </>
  );
};
export default HomePage;
