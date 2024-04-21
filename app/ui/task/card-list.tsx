import { Task } from "@/app/lib/definitions";
import TaskCard from "./card";

const TaskCardsList = ({ tasks }: { tasks: Task[] }) => {
    return (tasks.map((task: Task) => (<TaskCard key={task.id} task={task} />)));
};

export default TaskCardsList;