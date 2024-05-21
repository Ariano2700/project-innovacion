import { getTaskReminders } from "./getTaskReminders";

const formatTimeAgoWithColor = (timeAgo: string) => {
  const now = new Date();
  const time = new Date(timeAgo);
  const differenceInMs = now.getTime() - time.getTime();

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));

  let color = "";

  if (differenceInMinutes < 60) {
    color = "bg-green-500";
  } else if (differenceInHours < 24) {
    color = "bg-green-500";
  } else if (differenceInHours < 48) {
    color = "bg-yellow-500";
  } else {
    color = "bg-red-500";
  }
  return color;
};

const formatTimeAgo = (timeAgo: string) => {
  const now = new Date();
  const time = new Date(timeAgo);
  const differenceInMs = now.getTime() - time.getTime();

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));

  if (differenceInMinutes < 60) {
    console.log(`Subido hace ${differenceInMinutes} minuto(s).`);
    console.log(`Subido hace ${differenceInHours} hora(s)`);
    return `Subido hace ${differenceInMinutes} minuto(s).`;
  } else {
    return `Subido hace ${differenceInHours} hora(s).`;
  }
};

export const useGetTaskReminders = async () => {
  try {
    const reminders = await getTaskReminders();
    const formatedReminders =
      reminders
        ?.filter((task) => task.id !== null && task.id !== undefined)
        .map((task) => {
          const timeAgoDate = task.timeAgo ? new Date(task.timeAgo) : null;
          const timeAgoDateFormated = task.timeAgo
            ? formatTimeAgo(task.timeAgo)
            : "Fecha no disponible";
          const timeAgoDateColor = task.timeAgo
            ? formatTimeAgoWithColor(task.timeAgo)
            : "Fecha no disponible";

          return {
            id: task.id!,
            reminder: task.reminder,
            timeAgo: timeAgoDateFormated,
            timeAgoData: timeAgoDate,
            timeAgoColor: timeAgoDateColor,
          };
        }) || [];
    const sortedReminders = [...formatedReminders].sort((a, b) => {
      const dateA = a.timeAgoData || new Date(0);
      const dateB = b.timeAgoData || new Date(0);
      return dateA.getTime() - dateB.getTime();
    });
    return sortedReminders;
  } catch (error) {
    console.error(
      "Error al obtener el array del recordatorio de tareas",
      error
    );
    return [];
  }
};
