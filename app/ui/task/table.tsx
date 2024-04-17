import { Task } from "@/app/lib/definitions";
import { DeleteTask, UpdateTask } from "./buttons";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
    return (

        <div className="flex flex-col gap-y-1 w-full">
            {
                tasks.map((task: Task) => (
                    <div key={`${task.id}`} className="flex w-full p-5 justify-between bg-slate-900">
                        <p>{task.title}</p>
                        <UpdateTask id={`${task.id}`} />
                        <DeleteTask id={`${task.id}`} />
                    </div>
                ))
            }

        </div>
    );
}