import TaskRemindersCards from "../../components/TasksRemindersCards";
import { motion } from "framer-motion";

const AllTaskReminders = () => {
  return (
    <div className="">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 0.2,
          type: "spring",
        }}
        className="text-4xl mb-5 items-start"
      >
        Recordatorio de todas las tareas
      </motion.h1>
      <div className="flex items-center justify-center">
        <TaskRemindersCards />
      </div>
    </div>
  );
};
export default AllTaskReminders;
