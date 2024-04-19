'use client'

import { useFormState, useFormStatus } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteListDescription } from "@/app/lib/actions";

const initialState = {
    message: "",
}

export function CreateListDescription({
    children,
    className
}: Readonly<{
    children: React.ReactNode,
    className: string,
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

export function DeleteListDescription({ id }: { id: string }) {
    const { pending } = useFormStatus();
    const deleteListDescriptionWithId = deleteListDescription.bind(null, id);
    const [state, formAction] = useFormState(deleteListDescriptionWithId, initialState);

    return (
        <form
            name="deleteListDescriptionForm"
            id="deleteListDescriptionForm"
            action={formAction}
            className="flex h-full"
        >
            <button className="flex items-center justify-center">
                <TrashIcon className="w-5" />
            </button>
        </form>

    );
}