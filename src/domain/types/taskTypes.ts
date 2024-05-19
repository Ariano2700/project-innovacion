export type TaskReminderProps = {
  id?: string | null;
  reminder: string;
  timeAgo?: string;
  timeAgoNoFormat?:string
  handleDeleteType?: () => void; 
};
