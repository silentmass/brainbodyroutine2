'use client'

import { deleteTaskDescriptionList } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    message: "",
};

export function CreateTaskDescriptionList() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
        >
            Create list
        </button>
    );
};

export const DeleteTaskDescriptionList = ({ taskDescriptionListId }: { taskDescriptionListId: string }) => {
    const deleteTaskDescriptionListWithId = deleteTaskDescriptionList.bind(null, taskDescriptionListId);
    const [state, formAction] = useFormState(deleteTaskDescriptionListWithId, initialState)
    return (
        <form
            name="deleteTaskDescriptionListForm"
            id="deleteTaskDescriptionListForm"
            action={formAction}
        >
            <button type="submit">
                Delete
            </button>
        </form>
    );
};