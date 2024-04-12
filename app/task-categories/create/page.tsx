import { Metadata } from "next";
import CreateTaskCategoryForm from "../../ui/task-categories/create-form";

export const metadata: Metadata = {
    title: "Create Task category",
}

export default function Page() {

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <CreateTaskCategoryForm />
        </div>
    );
}