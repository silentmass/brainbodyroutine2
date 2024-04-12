'use client'
import { useFormState } from "react-dom";
import { updateTaskCategory } from "../../lib/actions";
import { TaskCategory } from "../../lib/definitions";
import Link from "next/link";

const initialState = {
    message: "",
};

export default function EditTaskCategoryForm({ taskCategory }: { taskCategory: TaskCategory }) {
    const updateTaskCategoryWithId = updateTaskCategory.bind(null, `${taskCategory.id}`);
    const [state, formAction] = useFormState(updateTaskCategoryWithId, initialState);

    return (
        <form
            name="editTaskCategoryForm"
            className="flex flex-col bg-slate-950 p-3 gap-y-3 justify-center items-center w-full"
            action={formAction}
        >
            <label className="bg-slate-900 p-3 w-full">
                <p>Title</p>
                <input
                    type="text"
                    id="taskCategoryTitle"
                    name="taskCategoryTitle"
                    required
                    className="bg-transparent border-b border-slate-300"
                    defaultValue={taskCategory.title}
                />
            </label>
            <label className="bg-slate-900 p-3 w-full">
                <p>Description</p>
                <input
                    type="text"
                    id="taskCategoryDescription"
                    name="taskCategoryDescription"
                    className="bg-transparent border-b border-slate-300"
                    defaultValue={taskCategory.description ? taskCategory.description : ""}
                />
                <Link href="/task-categories">
                    Cancel
                </Link>
                <button type="submit">Edit task category</button>
            </label>
        </form>
    );
};