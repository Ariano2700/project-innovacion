import { useEffect, useState } from "react";
import TaskReminderBase from "./TaskReminderBase";
import { useGetTaskReminders } from "../../../../hooks/useGetTaskReminders";
import { useDeleteTaskReminder } from "../../../../hooks/useDeleteTaskReminder";
import { TaskReminderProps } from "../../../../domain/types/taskTypes";
import { ConfirmAlert } from "../../../components/alerts/ConfirmAlert";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MaterialSymbolsAddRounded } from "../../../components/icons/material-symbols/MaterialSymbolsAddRounded";
import { useAuth } from "../../../../context/authContext";

const TasksReminders = () => {
  const { role } = useAuth();
  /*REMINDERS */
  const [taskReminders, setTaskReminders] = useState<
    { id: string; reminder: string; timeAgo: string }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reminders = await useGetTaskReminders();
        setTaskReminders(reminders);
      } catch (error) {
        console.error("Error al obtener los recordatorios de tareas:", error);
      }
    };
    fetchData();
  }, []);

  const { deleteTask } = useDeleteTaskReminder();

  const handleDelete = async (task: TaskReminderProps) => {
    try {
      ConfirmAlert(
        async () => {
          await deleteTask(task.id || "");
          Swal.fire({
            title: "¡Borrado!",
            text: "La tarea se ha eliminado.",
            icon: "success",
          });
          setTaskReminders((prev) => prev.filter((t) => t.id !== task.id));
        },
        {
          confirmButtonText: "Si, eliminar recordatorio",
          text: "El recordatorio se debe eliminar cuando la tarea de este mismo se haya realizado",
          title: "¿Deseas eliminar este recordatorio?",
        }
      );
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
  };
  // console.log("taskReminders:", taskReminders);
  /*REMINDERS */
  return (
    <div>
      <h1 className="text-2xl mb-5 items-start">Recordatorio de tareas</h1>
      <div className="flex flex-col flex-wrap justify-around gap-5 mb-3 mt-3">
        {taskReminders
          ? taskReminders.map((task) => (
              <TaskReminderBase
                key={task.id}
                reminder={task.reminder}
                timeAgo={task.timeAgo}
                id={task.id}
                handleDeleteType={() => handleDelete(task)}
              />
            ))
          : "No hay recordatorios"}
      </div>

      {role !== 1 ? (
        " "
      ) : (
        <Link to={"/panel/nuevo-recordatorio"}>
          <div className="mt-6 bg-white dark:bg-[#202528] p-3 py-8 w-[330px] rounded-3xl border-2 border-dashed border-primary cursor-pointer font-bold dark:hover:bg-p700 hover:bg-p100 hover:text-white text-primary">
            <div className="flex px-3 justify-center items-center content-center gap-2">
              <MaterialSymbolsAddRounded className="text-xl" />
              <h2>Añadir tarea</h2>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
export default TasksReminders;
