'use client'
import { useFormState, useFormStatus } from "react-dom";
import { TaskCategory } from "@/app/lib/definitions";
import { deleteTaskCategory, updateTaskCategory } from "@/app/lib/actions";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from 'clsx';

const initialState = {
    message: "",
};

export function CreateTaskCategory() {
    const { pending } = useFormStatus();

    return (
        <button className="flex items-center justify-center border rounded p-3 w-fit"
            type="submit"
            aria-disabled={pending}
        >
            Create
        </button>
    );
};

export function UpdateTaskCategory({ id }: { id: string }) {
    return (
        <Link href={`/task-categories/${id}/edit`}>
            <PencilIcon className="w-5" />
        </Link>

    );
};

export function DeleteTaskCategory({ id }: { id: string }) {
    const { pending } = useFormStatus();
    const deleteTaskCategoryWithId = deleteTaskCategory.bind(null, id)
    const [state, formAction] = useFormState(deleteTaskCategoryWithId, initialState);

    return (
        <form
            name="deleteTaskCategoryForm"
            className="flex flex-col bg-slate-950 gap-y-3 justify-center"
            action={formAction}
        >
            <button
                className="flex items-center justify-center w-fit"
                type="submit"
                aria-disabled={pending}
            >
                <TrashIcon className="w-5" />
            </button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
};