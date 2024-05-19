import { TaskReminderProps } from "../../../../domain/types/taskTypes";
import MaterialSymbolsInfoOutlineRounded from "../../../components/icons/material-symbols/MaterialSymbolsInfoOutlineRounded";
import { ZondiconsDotsHorizontalTriple } from "../../../components/icons/zond-icons/ZondiconsDotsHorizontalTriple";
import { Variants, motion } from "framer-motion";

const TaskReminderBase = (props: TaskReminderProps & { index: number }) => {
  const { reminder, timeAgo, handleDeleteType, id, index } = props;

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 1,
      },
    }),
  };
  return (
    <motion.div
      custom={{ delay: (index + 1) * 0.2 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      layoutId={id ? id : ""}
      className="bg-white dark:bg-[#202528] flex justify-between items-center p-3 py-5 w-[330px] rounded-3xl"
    >
      <div className="flex px-3 justify-center items-center">
        <div className="bg-red-500 rounded-xl mr-4">
          <div className="p-2">
            <MaterialSymbolsInfoOutlineRounded className="text-4xl text-white dark:text-[#202528]" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base">{reminder}</span>
          <span className="text-xs">{timeAgo}</span>
        </div>
      </div>
      <details className="dropdown dropdown-end">
        <summary className="flex items-center">
          <ZondiconsDotsHorizontalTriple className="text-2xl cursor-pointer" />
        </summary>
        <ul className="p-2 shadow-md menu dropdown-content z-[1] dark:bg-[#202528] bg-base-100 rounded-box w-52">
          <li className="">
            <button
              onClick={handleDeleteType}
              className="btn btn-outline btn-error justify-start"
            >
              Borrar tarea
            </button>
          </li>
        </ul>
      </details>
    </motion.div>
  );
};
export default TaskReminderBase;
