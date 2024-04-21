'use client'
import { Task, TaskCategory, TaskDescriptionList } from "@/app/lib/definitions";
import { updateTask } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import DescriptionListsTable from "./description-lists/table";
import { fieldBaseStyle, formLabelStyle, rowButtonsStyle } from "@/app/ui/form-components/form-styles";
import TaskCategoriesSelect from "@/app/ui/form-components/task-categories-select";
import FormActionStateMessage from "@/app/ui/form-components/form-action-message";
import { IsTaskActive } from "../form-components/is-task-active";
import { EditTask } from "./buttons";
import clsx from "clsx";



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
        <div className="flex flex-col w-full p-5 gap-y-5 border">
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

                <div className="w-full flex justify-between">

                    <Link href={`/tasks`} className={`w-1/3 ${rowButtonsStyle}`} >
                        Cancel
                    </Link>
                    <EditTask className={`w-1/3 ${rowButtonsStyle}`} >
                        Edit task
                    </EditTask>
                </div>
                {/* Form action state message */}
                <FormActionStateMessage state={state} />
            </form>
            {/* Task description lists */}



            <div className="flex flex-col gap-y-1 p-5">
                <div className="flex justify-between w-full items-end">
                    <h2>
                        {clsx({
                            "Lists": isList,
                            "No lists": !isList
                        })}
                    </h2>
                    <Link href={`/tasks/${task.id}/description-lists/create`} className={`w-1/2 ${rowButtonsStyle}`} >
                        Create List
                    </Link>
                </div>
                <div className="flex w-full">
                    <DescriptionListsTable taskDescriptionLists={taskDescriptionLists} />
                </div>
            </div>
        </div >

    );
};