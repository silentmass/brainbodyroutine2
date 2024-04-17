'use client'
import { useFormState } from "react-dom";
import { CreateTaskDescriptionList } from "./buttons";
import { createTaskDescriptionList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fieldBaseStyle, formLabelStyle } from "../../form-components/form-styles";
import FormActionStateMessage from "../../form-components/form-action-message";
import { Task } from "@/app/lib/definitions";
import Link from "next/link";

const initialState = {
    message: "",
    redirectTo: "",
};

export default function CreateTaskDescriptionListForm({ task }: { task: Task }) {
    const createTaskDescriptionListWithTaskId = createTaskDescriptionList.bind(null, `${task.id}`);
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
                    <div className="flex justify-start p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950">
                        <Link href={`/tasks/${task.id}/edit`}>Cancel</Link>
                    </div>
                    <div className="flex justify-end p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950">
                        <CreateTaskDescriptionList />
                    </div>
                </div>
                <FormActionStateMessage state={state} />
            </div>
        </form>
    );
};