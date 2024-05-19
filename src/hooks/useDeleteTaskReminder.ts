import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteTaskReminder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteTask = async (idReminder: string) => {
    try {
      setLoading(true);
      if (!idReminder) {
        throw new Error("El uid es inválido");
      }
      const taskDocRef = doc(db, `reminders/${idReminder}`);
      await deleteDoc(taskDocRef);
      setSuccess(true);
    } catch (error) {
      setError("Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return { loading, error, success, deleteTask };
};