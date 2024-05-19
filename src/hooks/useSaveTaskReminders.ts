import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firestore";
import { TaskReminderProps } from "../domain/types/taskTypes";

export const useSaveTaskReminders = async (props: TaskReminderProps) => {
    try {
      const { reminder, timeAgo } = props;
      await addDoc(collection(db, "reminders"), {
        reminder,
        timeAgo,
      });
      // console.log("Tarea guardada con id: ", docRef.id);
    } catch (error) {
      console.error("Error al guardar la tarea: ", error);
      console.error(error)
      throw new Error("Error al guardar la tarea");
    }
  };