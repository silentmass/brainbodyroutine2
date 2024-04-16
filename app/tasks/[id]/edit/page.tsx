import { fetchTaskById, fetchTaskCategories, fetchTaskDescriptionLists } from "@/app/lib/data";
import EditTaskCategoryForm from "@/app/ui/task-categories/edit-form";
import EditTaskForm from "@/app/ui/task/edit-form";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Edit Task",
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const task = await fetchTaskById(id);
    const taskCategories = await fetchTaskCategories();
    const taskDescriptionLists = await fetchTaskDescriptionLists(id);
    return (
        <div className="flex w-full h-screen flex-col">
            <EditTaskForm
                task={task}
                taskCategories={taskCategories}
                taskDescriptionLists={taskDescriptionLists}
            />
        </div>
    );
};