'use client'
import { useFormState } from "react-dom";
import { updateTaskCategory } from "@/app/lib/actions";
import { TaskCategory } from "@/app/lib/definitions";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { fieldBaseStyle, formLabelStyle, rowButtonsStyle } from "../form-components/form-styles";
import FormActionStateMessage from "../form-components/form-action-message";
import { EditCategory } from "./buttons";

const initialState = {
    message: "",
    redirectTo: null,
};

export default function EditTaskCategoryForm({ taskCategory }: { taskCategory: TaskCategory }) {
    const updateTaskCategoryWithId = updateTaskCategory.bind(null, `${taskCategory.id}`);
    const [state, formAction] = useFormState(updateTaskCategoryWithId, initialState);
    const router = useRouter();
    useEffect(() => {
        if (state.redirectTo) {
            router.push(state.redirectTo)
        }
    }, [state, router]);

    return (
        <form
            name="editTaskCategoryForm"
            action={formAction}
            className="flex flex-col gap-y-1 justify-start w-full items-start"
        >
            <div className="flex flex-col p-5 gap-y-1 bg-slate-950 w-full">
                <label className={`${formLabelStyle}`}>
                    <p>Title</p>
                    <input
                        type="text"
                        id="taskCategoryTitle"
                        name="taskCategoryTitle"
                        required
                        className={`${fieldBaseStyle}`}
                        defaultValue={taskCategory.title}
                    />
                </label>
                <label className={`${formLabelStyle}`}>
                    <p>Description</p>
                    <input
                        type="text"
                        id="taskCategoryDescription"
                        name="taskCategoryDescription"
                        className={`${fieldBaseStyle}`}
                        defaultValue={taskCategory.description ? taskCategory.description : ""}
                    />
                </label>
                <div className="flex w-full justify-between">
                    <Link href={`/task-categories`} className={`w-1/3 items-center ${rowButtonsStyle}`} >
                        Cancel
                    </Link>
                    <EditCategory className={`w-1/3 items-center ${rowButtonsStyle}`} >
                        Update
                    </EditCategory>
                </div>
                <FormActionStateMessage state={state} />
            </div>
        </form >
    );
};