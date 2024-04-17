'use client'
import { Task, TaskCategory, TaskDescriptionList } from "@/app/lib/definitions";
import { updateTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import DescriptionListsTable from "./description-lists/table";
import { fieldBaseStyle, formLabelStyle } from "@/app/ui/form-components/form-styles";
import TaskCategoriesSelect from "@/app/ui/form-components/task-categories-select";
import FormActionStateMessage from "@/app/ui/form-components/form-action-message";
import { IsTaskActive } from "../form-components/is-task-active";



const initialState = {
    message: "",
    redirectTo: null,
};

export default function EditTaskForm(
    { task, taskCategories, taskDescriptionLists }
        : { task: Task, taskCategories: TaskCategory[], taskDescriptionLists: TaskDescriptionList[] }) {
    const updateTaskWithId = updateTask.bind(null, `${task.id}`);
    const [state, formAction] = useFormState(updateTaskWithId, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.redirectTo) {
            router.push(state.redirectTo)
        }
    }, [state, router]);

    const isList = taskDescriptionLists && taskDescriptionLists.length > 0;

    return (
        <div className="flex flex-col w-full p-5 gap-y-5 bg-slate-950">
            <form
                name="editTaskForm"
                action={formAction}
                className="flex flex-col gap-y-1 justify-start w-full items-start"
            >
                {/* Task title */}
                <label className={`${formLabelStyle}`}>
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskTitle"
                        id="taskTitle"
                        required
                        className={`${fieldBaseStyle}`}
                        defaultValue={task.title}
                    />
                </label>
                {/* Task category */}
                <label className={`${formLabelStyle}`}>
                    <p>Task category</p>
                    <TaskCategoriesSelect categories={taskCategories} defaultCategoryId={task.task_category_id} />
                </label>
                {/* Task is active */}
                <label className={`formField p-5 flex gap-x-5 items-center h-full`}>
                    <div className=""><p>Is active </p></div>
                    <div className="flex w-4 h-4"><IsTaskActive isActiveValue={task.is_active} /></div>
                </label>
                {/* Task controls */}
                <div className="flex w-full justify-between">
                    <div className="flex justify-start p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950"><Link href="/tasks">Cancel</Link></div>
                    <div className="flex justify-end p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950"><button type="submit">Edit task</button></div>
                </div>
                {/* Form action state message */}
                <FormActionStateMessage state={state} />
            </form>
            {/* Task description lists */}
            <div className="flex justify-between items-center">
                {
                    (isList)
                        ? <h2>Lists</h2>
                        : <h2>No lists</h2>
                }
                <Link
                    href={`/tasks/${task.id}/description-lists/create`}
                    className="flex justify-end p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950"
                >
                    Create List
                </Link>
            </div>
            <div className="flex flex-col gap-y-1">
                <DescriptionListsTable taskDescriptionLists={taskDescriptionLists} />
            </div>
        </div >

    );
};