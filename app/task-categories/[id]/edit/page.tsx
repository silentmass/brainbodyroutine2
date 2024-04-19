import { Metadata } from "next";
import EditTaskCategoryForm from "@/app/ui/task-categories/edit-form";
import { fetchTaskCategoryById } from "@/app/lib/data";

export const metadata: Metadata = {
    title: "Edit Task category",
}
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const taskCategory = await fetchTaskCategoryById(id);
    return (
        <div className="flex w-full h-screen items-center flex-col">
            <h2>Edit Task category</h2>
            <EditTaskCategoryForm taskCategory={taskCategory} />
        </div>
    );
};