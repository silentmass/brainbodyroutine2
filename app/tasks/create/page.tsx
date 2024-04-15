import CreateTaskForm from "@/app/ui/task/create-form";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Create task"
};

export default function Page() {
    return (
        <div className="flex flex-col w-full max-w-2xl border items-center justify-center p-5">
            <h2>Create task</h2>
            <Suspense fallback={<p>Loading create task form...</p>}>
                <CreateTaskForm />
            </Suspense>
        </div>

    )
};