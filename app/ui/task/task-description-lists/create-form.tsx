'use client'
import { useFormState } from "react-dom";
import { CreateTaskDescriptionList } from "./buttons";
import { createTaskDescriptionList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
    message: "",
    redirectTo: "",
};

export default function CreateTaskDescriptionListForm({ taskId }: { taskId: string }) {
    const createTaskDescriptionListWithTaskId = createTaskDescriptionList.bind(null, `${taskId}`);
    const [state, formAction] = useFormState(createTaskDescriptionListWithTaskId, initialState)
    const router = useRouter();
    useEffect(() => {
        if (state?.redirectTo !== "") {
            router.push(state?.redirectTo);
        }
    }, [state, router])
    return (
        <div>
            Create Task {taskId} Description List
            <form
                name="createTaskDescriptionListForm"
                id="createTaskDescriptionListForm"
                action={formAction}
            >
                <label>
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskDescriptionListTitle"
                        id="taskDescriptionListTitle"
                        required
                        className={`formField`}
                    />
                </label>
                <CreateTaskDescriptionList />
            </form>
        </div>
    );
};