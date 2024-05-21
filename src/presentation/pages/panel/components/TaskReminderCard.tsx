import { TaskReminderProps } from "../../../../domain/types/taskTypes";
import { Variants, motion } from "framer-motion";
const TaskReminderCard = (props: TaskReminderProps & { index: number }) => {
  const { handleDeleteType, reminder, id, timeAgo, timeAgoColor, index } =
    props;
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
    <>
      <motion.div
        className="bg-white w-48 rounded-lg"
        custom={{ delay: (index + 1) * 0.2 }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        layoutId={id ? id : ""}
      >
        <div className="flex p-2 gap-1 justify-between">
          <div className="flex gap-1">
            <div className="circle">
              <span
                className={`${timeAgoColor} inline-block center w-3 h-3 rounded-full`}
              ></span>
            </div>
            <div className="circle">
              <span
                className={`${timeAgoColor} inline-block center w-3 h-3 rounded-full`}
              ></span>
            </div>
            <div className="circle">
              <span
                className={`${timeAgoColor} box inline-block center w-3 h-3 rounded-full`}
              ></span>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="circle">
              <button
                className="flex justify-center items-center"
                onClick={handleDeleteType}
              >
                <div className="bg-red-400 flex items-center justify-center center w-4 h-4 rounded-full">
                  <span className="text-white text-sm">
                    x
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col text-black p-3">
          <span className="text-xl text-justify font-bold mb-2">
            {reminder}
          </span>
          <span className="text-sm text-center mb-3">{timeAgo}</span>
        </div>
      </motion.div>
    </>
  );
};
export default TaskReminderCard;
