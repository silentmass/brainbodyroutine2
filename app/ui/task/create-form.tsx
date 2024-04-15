'use client';
import { CreateTaskButton } from "@/app/ui/task/buttons";
import { TaskCategory } from "@/app/lib/definitions";
import { createTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import clsx from "clsx";

const fieldBaseStyle = "dark:text-white bg-transparent border-b w-full";
const initialState = {
    message: "",
};

export default function CreateTaskForm({ taskCategories }: { taskCategories: TaskCategory[] }) {

    const [state, formAction] = useFormState(createTask, initialState);

    return (
        <form name="createTaskForm" className="flex flex-col bg-slate-950 p-3 gap-y-3 justify-center items-center w-full" action={formAction}>
            <label className="w-full">
                <p>Title</p>
                <input type="text" name="taskTitle" id="taskTitle" required
                    className={`${fieldBaseStyle}`}
                />
            </label>
            <label className="w-full">
                <p>Is active</p>
                <input type="checkbox" name="isActive" id="isActive" required defaultChecked
                    className={``}
                />
            </label>
            <label className="w-full">
                <p>Task category</p>
                <select name="taskCategoryId" id="taskCategoryId" defaultValue={taskCategories[0].id}
                    className={`${fieldBaseStyle}`}
                >
                    {taskCategories.map((taskCategory: TaskCategory) => (
                        <option key={taskCategory.id} value={taskCategory.id}>{taskCategory.title}</option>
                    ))}
                </select>
            </label>
            {/* <label className="w-full">
                <p>Tag</p>
                <input type="text" name="taskTagId" id="taskTagId"
                    className={`${fieldBaseStyle}`}
                />
            </label> */}
            <CreateTaskButton />
            <p className={`${clsx({
                "hidden": state?.message === "",
                "": state?.message !== "",
            })}`}>
                {state?.message}
            </p>
            <p aria-live="polite" className="sr-only">
                {state?.message}
            </p>
        </form>
    );
};