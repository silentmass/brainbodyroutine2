import { Metadata } from "next";
import EditTaskCategoryForm from "../../../ui/task-categories/edit-form";
import { fetchTaskCategoryById } from "../../../lib/data";

export const metadata: Metadata = {
    title: "Edit Task category",
}
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const taskCategory = await fetchTaskCategoryById(id);
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <h2>Edit Task category</h2>
            {taskCategory.title}
            <EditTaskCategoryForm />
        </div>
    );
};