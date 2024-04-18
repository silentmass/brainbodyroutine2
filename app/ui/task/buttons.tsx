'use client'
import { useFormState, useFormStatus } from "react-dom";
import { deleteTask } from "@/app/lib/actions";
import clsx from "clsx";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const initialState = {
    message: "",
}

export function CreateTask() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex items-center justify-center p-5 bg-slate-800 hover:bg-slate-900"
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
};

export function UpdateTask({ id }: { id: string }) {
    return (
        <Link href={`/tasks/${id}/edit`}>
            <PencilIcon className="w-5" />
        </Link>
    );
};


export function EditTask({
    children, className
}: Readonly<{
    children: React.ReactNode, className: string;
}>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className={className}
        >
            {children}
        </button>
    );
};