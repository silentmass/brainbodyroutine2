'use client'
import { useFormState } from "react-dom";
import { CreateTaskDescriptionList } from "./buttons";
import { createDescriptionList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fieldBaseStyle, formLabelStyle, rowButtonsStyle } from "../../form-components/form-styles";
import FormActionStateMessage from "../../form-components/form-action-message";
import { Task } from "@/app/lib/definitions";
import Link from "next/link";

const initialState = {
    message: "",
    redirectTo: "",
};

export default function CreateTaskDescriptionListForm({ task }: { task: Task }) {
    const createTaskDescriptionListWithTaskId = createDescriptionList.bind(null, `${task.id}`);
    const [state, formAction] = useFormState(createTaskDescriptionListWithTaskId, initialState)
    const router = useRouter();

    useEffect(() => {
        if (state?.redirectTo !== "") {
            router.push(state?.redirectTo);
        }
    }, [state, router])

    return (
        <form
            name="createTaskDescriptionListForm"
            id="createTaskDescriptionListForm"
            action={formAction}
            className="flex flex-col gap-y-1 justify-start w-full items-start"
        >
            <div className="flex flex-col p-5 gap-y-1 bg-slate-950 w-full">
                <div className={`flex w-full justify-center p-5`}>
                    <h2>{task.title}</h2>
                </div>
                <label className={`${formLabelStyle}`}>
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskDescriptionListTitle"
                        id="taskDescriptionListTitle"
                        required
                        className={`${fieldBaseStyle}`}
                    />
                </label>

                <div className="flex w-full justify-between">
                    <Link href={`/tasks/${task.id}/edit`} className={`${rowButtonsStyle}`} >
                        Cancel
                    </Link>
                    <CreateTaskDescriptionList className={`${rowButtonsStyle}`} >
                        Create list
                    </CreateTaskDescriptionList>
                </div>
                <FormActionStateMessage state={state} />
            </div>
        </form>
    );
};