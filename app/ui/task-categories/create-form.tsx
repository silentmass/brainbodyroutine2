'use client'
import { createTaskCategory } from "../../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { CreateTaskCategory } from "./buttons";
import clsx from "clsx";

const initialState = {
    message: "",
};

export default function CreateTaskCategoryForm() {
    const [state, formAction] = useFormState(createTaskCategory, initialState)

    return (
        <form
            name="createTaskCategoryForm"
            className="flex flex-col bg-slate-950 p-3 gap-y-3 justify-center items-center w-full"
            action={formAction}
        >
            <label className="bg-slate-900 p-3">
                <p>Title</p>
                <input
                    type="text"
                    id="taskCategoryTitle"
                    name="taskCategoryTitle"
                    required
                    className="bg-transparent border-b border-slate-300"
                />
            </label>
            <CreateTaskCategory />
            <p className={clsx({
                "hidden": state?.message === "",
                "": state?.message !== ""
            })}>{state?.message}</p>
            <p aria-live="polite" className="sr-only">
                {state?.message}
            </p>
        </form>
    );
}