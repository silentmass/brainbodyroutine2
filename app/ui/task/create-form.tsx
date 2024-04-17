'use client';
import { CreateTask } from "@/app/ui/task/buttons";
import { TaskCategory } from "@/app/lib/definitions";
import { createTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import clsx from "clsx";
import TaskCategoriesSelect from "../form-components/task-categories-select";
import FormActionStateMessage from "../form-components/form-action-message";
import { fieldBaseStyle, formLabelStyle } from "../form-components/form-styles";
import { IsTaskActive } from "../form-components/is-task-active";


const initialState = {
    message: "",
};

export default function CreateTaskForm({ taskCategories }: { taskCategories: TaskCategory[] }) {

    const [state, formAction] = useFormState(createTask, initialState);

    return (
        <form
            name="createTaskForm"
            id="createTaskForm"
            action={formAction}
            className="flex flex-col gap-y-1 justify-start w-full items-start"
        >
            <input
                type="checkbox"
                name="taskIsActive"
                id="taskIsActive"
                className={``}
                required
                defaultChecked
                hidden
            />
            <div className="flex flex-col p-5 gap-y-1 bg-slate-950 w-full">
                <label className={`${formLabelStyle}`}>
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskTitle"
                        id="taskTitle"
                        required
                        className={`${fieldBaseStyle}`}
                    />
                </label>
                <label className={`${formLabelStyle}`}>
                    <p>Task category</p>
                    <TaskCategoriesSelect categories={taskCategories} defaultCategoryId={taskCategories[0].id} />
                </label>
                <CreateTask />
                <FormActionStateMessage state={state} />
            </div>
        </form>
    );
};