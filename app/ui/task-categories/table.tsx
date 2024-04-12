import { useEffect } from "react";
import { TaskCategory } from "../../lib/definitions";
import { DeleteTaskCategory, UpdateTaskCategory } from "./buttons";


export default function TaskCategoriesTable({ taskCategories }: { taskCategories: TaskCategory[] | any }) {

    if (taskCategories) {
        return (
            <div className="flex flex-col gap-y-3 justify-center items-center">
                {
                    taskCategories.map((category: TaskCategory, id: string) => (
                        <div key={category.id} className="flex flex-col bg-slate-950 w-full">
                            <p className="flex min-w-2xl">{category.title}</p>
                            <UpdateTaskCategory id={`${category.id}`} />
                            <DeleteTaskCategory id={`${category.id}`} />
                        </div>
                    ))
                }
            </div>
        );
    } else {
        return <p>No task categories</p>;
    }


};