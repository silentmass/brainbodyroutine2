import TaskCategoriesTable from "../ui/task-categories/table";
import { fetchTaskCategories } from "../lib/data";
import CreateTaskCategory from "../ui/task-categories/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Task categories"
}

export default async function Page() {

    const taskCategories = await fetchTaskCategories();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between border">
            <div className="flex flex-col gap-y-3 border w-full max-w-sm pt-10 pb-10 pl-5 pr-5">
                <h2>Task categories</h2>
                <CreateTaskCategory />
                <TaskCategoriesTable taskCategories={taskCategories} />
            </div>
        </main >
    );
}