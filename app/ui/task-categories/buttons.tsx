'use client'
import { useFormState, useFormStatus } from "react-dom";
import { TaskCategory } from "../../lib/definitions";
import { deleteTaskCategory } from "../../lib/actions";

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

export function DeleteTaskCategory({ taskCategory }: { taskCategory: TaskCategory; }) {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(deleteTaskCategory, initialState);

    return (
        <form
            name="deleteTaskCategoryForm"
            className="flex flex-col bg-slate-950 p-3 gap-y-3 justify-center items-center"
            action={formAction}
        >
            <input type="hidden" name="taskCategoryId" id="taskCategoryId" value={taskCategory.id} />
            <input type="hidden" name="taskCategoryTitle" id="taskCategoryTitle" value={taskCategory.title} />
            <button
                className="flex items-center justify-center border rounded p-3 w-fit"
                type="submit"
                aria-disabled={pending}
            >
                Delete
            </button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
};