import ComponentDashBoard from "../../components/DashboardTest";
import TasksRemindersBase from "../../components/TasksRemindersBase";

const HomePage = () => {
  return (
    <>
      <div className="lg:flex mt-10">
        <ComponentDashBoard></ComponentDashBoard>
        <div className="flex items-center max-sm:justify-center lg:flex-col lg:items-end  ">
          <TasksRemindersBase />
        </div>
      </div>
    </>
  );
};
export default HomePage;
