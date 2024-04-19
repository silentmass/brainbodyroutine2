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
        <div className="flex flex-col gap-y-3 w-full max-w-sm">
            <CreateTaskCategoryForm />
            <div className="flex flex-col w-full gap-y-1">
                <TaskCategoriesTable taskCategories={taskCategories} />
            </div>

        </div>
    );
}