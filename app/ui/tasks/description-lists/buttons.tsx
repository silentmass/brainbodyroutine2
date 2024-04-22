'use client'

import { deleteDescriptionList } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

const initialState = {
    message: "",
};

export function CreateTaskDescriptionList({
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

export function UpdateTaskDescriptionList({
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

export const DeleteTaskDescriptionList = ({ taskDescriptionListId }: { taskDescriptionListId: string }) => {
    const deleteTaskDescriptionListWithId = deleteDescriptionList.bind(null, taskDescriptionListId);
    const [state, formAction] = useFormState(deleteTaskDescriptionListWithId, initialState)
    return (
        <form
            name="deleteTaskDescriptionListForm"
            id="deleteTaskDescriptionListForm"
            action={formAction}
        >
            <button type="submit">
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
};
