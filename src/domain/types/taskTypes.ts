export type TaskReminderProps = {
  id?: string | null;
  reminder: string;
  timeAgo?: string;
  timeAgoNoFormat?: string;
  timeAgoColor?: string;
  handleDeleteType?: () => void;
};
