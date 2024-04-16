'use client'
import { useFormState, useFormStatus } from "react-dom";
import { deleteTask } from "@/app/lib/actions";
import clsx from "clsx";

const initialState = {
    message: "",
}

export function CreateTask() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex items-center justify-center border rounded p-3 w-fit"
            type="submit" aria-disabled={pending}>
            Create task
        </button>
    );
};

export function DeleteTask({ id }: { id: string }) {
    const deleteTaskWithId = deleteTask.bind(null, id);
    const [state, formAction] = useFormState(deleteTaskWithId, initialState);
    const { pending } = useFormStatus();

    return (
        <form name="deleteTaskForm" action={formAction}>
            <button type="submit" aria-disabled={pending}>
                Delete
            </button>
            <p className={`${clsx({
                "hidden": state?.message === "",
                "": state?.message !== "",
            })}`}>
                {state?.message}
            </p>
            <p aria-live="polite" className="sr-only" role="status" >
                {state?.message}
            </p>
        </form>
    );
}