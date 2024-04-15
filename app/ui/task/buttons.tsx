'use client'
import { useFormStatus } from "react-dom";

export function CreateTaskButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex items-center justify-center border rounded p-3 w-fit"
            type="submit" aria-disabled={pending}>
            Create task
        </button>
    );
};