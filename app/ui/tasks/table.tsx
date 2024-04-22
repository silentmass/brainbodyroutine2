import { Task } from "@/app/lib/definitions";
import { DeleteTask, UpdateTask } from "./buttons";
import TaskCardsList from "./card-list";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
    return (

        <div className="flex flex-col gap-y-1 w-full">
            <TaskCardsList tasks={tasks} />
        </div>
    );
}