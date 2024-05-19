import { TaskReminderProps } from "../../../../domain/types/taskTypes";
import MaterialSymbolsInfoOutlineRounded from "../../../components/icons/material-symbols/MaterialSymbolsInfoOutlineRounded";
import { ZondiconsDotsHorizontalTriple } from "../../../components/icons/zond-icons/ZondiconsDotsHorizontalTriple";


const TaskReminderBase = (props: TaskReminderProps) => {
  const { reminder, timeAgo, handleDeleteType } = props;

  return (
    <div className="bg-white dark:bg-[#202528] flex justify-between items-center p-3 py-5 w-[330px] rounded-3xl">
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
                <button onClick={handleDeleteType} className="btn btn-outline btn-error justify-start">
                    Borrar tarea
                </button>
            </li>
        </ul>
      </details>
    </div>
  );
};
export default TaskReminderBase;
