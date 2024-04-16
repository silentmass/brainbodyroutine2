import { Task } from "@/app/lib/definitions";
import { DeleteTask } from "./buttons";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
    return (

        <div className="flex flex-col gap-y-5 w-full">
            {
                tasks.map((task: Task) => (
                    <div key={`${task.id}`} className="flex w-full p-5 justify-between bg-slate-900">
                        <p>{task.title}</p>
                        <DeleteTask id={`${task.id}`} />
                    </div>
                ))
            }

        </div>
    );
}