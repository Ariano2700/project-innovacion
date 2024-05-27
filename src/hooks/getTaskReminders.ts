import { collection, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase/firestore";
import { TaskReminderProps } from "../domain/types/taskTypes";

export const getTaskReminders = async(
//  callback: (taskReminders: TaskReminderProps[]) => void
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
    // const remindersRef = collection(db, "reminders");

    // const unsubscribe = onSnapshot(remindersRef, (querySnapshot) => {
    //   const taskReminders: TaskReminderProps[] = [];
    //   querySnapshot.forEach((doc) => {
    //     const data = doc.data();
    //     const id = doc.id || "No ID";
    //     taskReminders.push({ id, ...data } as TaskReminderProps);
    //   });
    //   callback(taskReminders);
    // });
  
    // return unsubscribe;
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};
