import { fetchTaskById } from "@/app/lib/data";
import CreateTaskDescriptionListForm from "@/app/ui/task/description-lists/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit Task Description List"
};

export default async function Page({ params }: { params: { id: string } }) {
    const taskId = params.id
    const task = await fetchTaskById(taskId);
    return (
        <CreateTaskDescriptionListForm task={task} />
    );
};