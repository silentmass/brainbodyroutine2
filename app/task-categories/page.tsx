import TaskCategoriesTable from "@/app/ui/task-categories/table";
import { fetchTaskCategories } from "../lib/data";
import CreateTaskCategoryForm from "@/app/ui/task-categories/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Task categories"
};

export default async function Page() {

    const taskCategories = await fetchTaskCategories();

    return (
        <div className="flex flex-col gap-y-3 border w-full max-w-sm pt-10 pb-10 pl-5 pr-5">
            <h2>Task categories</h2>
            <CreateTaskCategoryForm />
            <TaskCategoriesTable taskCategories={taskCategories} />
        </div>
    );
}