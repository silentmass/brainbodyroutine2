import { Suspense } from "react";
import { fetchTaskCategories, fetchTasks } from "@/app/lib/data";
import CreateTaskForm from "@/app/ui/task/create-form";
import TasksTable from "../ui/task/table";

export default async function Page() {
    const taskCategories = await fetchTaskCategories();
    const tasks = await fetchTasks();
    return (
        <div className="flex flex-col w-full h-full justify-center border items-center gap-y-10 p-10">
            <Suspense fallback={<p>Loading task categories...</p>}>
                <CreateTaskForm taskCategories={taskCategories} />
            </Suspense>
            <Suspense fallback={<p>Loading taks...</p>}>
                <TasksTable tasks={tasks} />
            </Suspense>
        </div>
    );
};