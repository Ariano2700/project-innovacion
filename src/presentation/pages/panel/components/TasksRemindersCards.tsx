import { useEffect, useState } from "react";
import TaskReminderCard from "./TaskReminderCard";
import { useGetTaskReminders } from "../../../../hooks/useGetTaskReminders";
import { useDeleteTaskReminder } from "../../../../hooks/useDeleteTaskReminder";
import { ConfirmAlert } from "../../../components/alerts/ConfirmAlert";
import { TaskReminderProps } from "../../../../domain/types/taskTypes";
import Swal from "sweetalert2";

const TaskRemindersCards = () => {
  const [taskReminders, setTaskReminders] = useState<
    { id: string; reminder: string; timeAgo: string; timeAgoColor: string }[]
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

  return (
    <div className="flex flex-wrap justify-center gap-20">
      {taskReminders
        ? taskReminders.map((task, index) => (
            <TaskReminderCard
              key={task.id}
              index={index}
              id={task.id}
              reminder={task.reminder}
              timeAgo={task.timeAgo}
              timeAgoColor={task.timeAgoColor}
              handleDeleteType={() => handleDelete(task)}
            />
          ))
        : "No hay recordatorios"}
    </div>
  );
};
export default TaskRemindersCards;
