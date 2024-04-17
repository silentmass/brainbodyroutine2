'use client'
import { createTaskCategory } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { CreateTaskCategory } from "./buttons";
import clsx from "clsx";
import FormActionStateMessage from "../form-components/form-action-message";
import { fieldBaseStyle } from "../form-components/form-styles";

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
                    className={`${fieldBaseStyle}`}
                />
            </label>
            <CreateTaskCategory />
            <FormActionStateMessage state={state} />
        </form>
    );
}