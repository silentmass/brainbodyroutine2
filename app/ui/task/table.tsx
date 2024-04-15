import { Task } from "@/app/lib/definitions";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
    return (

        <div className="flex flex-col">
            {
                tasks.map((task: Task) => (
                    <div key={`${task.id}`}>{task.title}</div>
                ))
            }

        </div>
    );
}