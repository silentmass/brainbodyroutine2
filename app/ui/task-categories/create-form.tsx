'use client'
import { createTaskCategory } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { CreateTaskCategory } from "./buttons";
import clsx from "clsx";
import FormActionStateMessage from "../form-components/form-action-message";
import { fieldBaseStyle, formLabelStyle, rowButtonsStyle } from "../form-components/form-styles";

const initialState = {
    message: "",
};

export default function CreateTaskCategoryForm() {
    const [state, formAction] = useFormState(createTaskCategory, initialState)

    return (
        <form
            name="createTaskCategoryForm"
            className="flex flex-col gap-y-1 justify-start w-full items-start"
            action={formAction}
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
                    />
                </label>
                <CreateTaskCategory className={`w-full ${rowButtonsStyle}`}>Create category</CreateTaskCategory>
                <FormActionStateMessage state={state} />
            </div>
        </form>
    );
}