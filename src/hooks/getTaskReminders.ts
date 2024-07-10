import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { TaskReminderProps } from "../domain/types/taskTypes";

export const getTaskReminders = async(
) => {
  try {
    const querySnapshot = await getDocs(collection(db, "reminders"));
    const taskReminders: TaskReminderProps[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id || "No ID";
      taskReminders.push({ id: id, ...data } as TaskReminderProps);
    });
    return taskReminders;
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};
