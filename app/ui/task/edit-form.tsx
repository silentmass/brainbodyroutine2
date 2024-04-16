'use client'
import { Task, TaskCategory, TaskDescrionList } from "@/app/lib/definitions";
import { updateTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import TaskDescriptionListsTable from "./task-description-lists/table";

const initialState = {
    message: "",
    redirectTo: null,
};

export default function EditTaskForm(
    { task, taskCategories, taskDescriptionLists }
        : { task: Task, taskCategories: TaskCategory[], taskDescriptionLists: TaskDescrionList[] }) {
    const updateTaskWithId = updateTask.bind(null, `${task.id}`);
    const [state, formAction] = useFormState(updateTaskWithId, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.redirectTo) {
            router.push(state.redirectTo)
        }
    }, [state, router]);

    const IsActive = ({ isActiveValue }: { isActiveValue: boolean }) => (
        isActiveValue
            ? <input
                type="checkbox"
                name="taskIsActive"
                id="taskIsActive"
                className={`formField`}
                required
                defaultChecked
            />
            : <input
                type="checkbox"
                name="taskIsActive"
                id="taskIsActive"
                className={`formField`}
                required
            />
    );

    return (
        <div className="flex flex-col p-3 gap-y-5">
            <form
                name="editTaskForm"
                action={formAction}
                className="flex flex-col bg-slate-950 p-3 gap-y-3 justify-start w-full items-start border"
            >
                <label className="formField w-full p-3 bg-slate-900">
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskTitle"
                        id="taskTitle"
                        required
                        className={`formField`}
                        defaultValue={task.title}
                    />
                </label>
                <label className="formField w-full p-3 bg-slate-900">
                    <p>Task category</p>
                    <select name="taskCategoryId" id="taskCategoryId" defaultValue={task.task_category_id} className={`formField`}>
                        {taskCategories.map((taskCategory) => (
                            <option key={`${taskCategory.id}`} value={taskCategory.id} >{taskCategory.title}</option>
                        ))}
                    </select>
                </label>
                <label className="formField w-full p-3 bg-slate-900">
                    <p>Is active</p>
                    <IsActive isActiveValue={task.is_active} />
                </label>


                <Link href="/tasks">
                    Cancel
                </Link>
                <button type="submit">Edit task</button>
                <p className={`${clsx({
                    "hidden": state?.message === "",
                    "": state?.message !== "",
                })}`}>{state?.message}</p>
                <p aria-live="polite" className="sr-only" >
                    {state?.message}
                </p>
            </form>
            <div className="p-3 bg-slate-950">
                <Link href={`/tasks/${task.id}/task-description-list/create`}>
                    Create List
                </Link>
            </div>
            <TaskDescriptionListsTable taskDescriptionLists={taskDescriptionLists} />
        </div>

    );
};