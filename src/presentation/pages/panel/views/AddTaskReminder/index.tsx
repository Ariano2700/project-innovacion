import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../outsite/components/InputForm";
import { MaterialSymbolsDescriptionOutlineRounded } from "../../../../components/icons/material-symbols/MaterialSymbolsDescriptionOutlineRounded";
import { useState } from "react";
import {
  handleChangeType,
  handleSubmitType,
} from "../../../../../domain/types/formTypes";
import { TaskReminderProps } from "../../../../../domain/types/taskTypes";
import { SavedAlert } from "../../../../components/alerts/SavedAlert";
import { useSaveTaskReminders } from "../../../../../hooks/useSaveTaskReminders";
import { ErrorAlert } from "../../../../components/alerts/ErrorAlert";

const AddTaskReminder = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskReminderProps>({
    reminder: "",
  });
  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      if (!task.reminder.trim()) {
        ErrorAlert({error: "Por favor complete los campos."})
        console.error("Por favor complete los campos.");
        return;
      }
      const now = new Date();
      const timeAgo = now.toISOString();
      await useSaveTaskReminders({ ...task, timeAgo:timeAgo });
      setTask({ id: null, reminder: "", timeAgo: "" });
      SavedAlert({title:"Recordatorio guardado"});
      navigate("/");
    } catch (error) {
      console.error("Error al guardar la tarea: ", error);
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
          <form
            className="flex flex-col items-center gap-6 bg-white dark:bg-[#202528] p-16 rounded-lg shadow-2xl w-full relative z-10 transform transition duration-500 ease-in-out text-center"
              onSubmit={handleSubmit}
          >
            <Link to={"/"}>
              <div className=" flex items-center gap-1 cursor-pointer text-black dark:text-white text-xl w-full">
                <span>Atras</span>
              </div>
            </Link>
            <h1 className="text-black dark:text-white font-bold text-3xl">
              Agregar nueva tarea
            </h1>
            <div className="flex flex-col gap-8 mt-4">
              <InputForm
                name="reminder"
                placeholder="Titulo del recordatorio"
                type="text"
                icon={<MaterialSymbolsDescriptionOutlineRounded  className="text-black dark:text-white"/>}
                onChange={handleChange}
                styleProp="h-10 rounded input input-bordered w-full bg-slate-100 dark:bg-[#202528] dark:text-white text-black dark:placeholder:text-white placeholder:text-black p-2 pr-10 border border-black dark:border-white"
              />
            </div>
            <div className="flex justify-center items-center gap-4 mt-9">
              <button className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-primary bg-primary group hover:bg-primary active:bg-primary active:border-primary">
                <span className="text-gray-200 font-semibold ml-2 transform">
                  Añadir Tarea
                </span>
                <span className="absolute right-0 h-full w-10 rounded-lg bg-primary flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                  <svg
                    className="svg w-8 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddTaskReminder;
