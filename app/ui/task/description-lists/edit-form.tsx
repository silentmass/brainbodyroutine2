'use client'

import { TaskDescriptionList } from "@/app/lib/definitions";
import Link from "next/link";
import { fieldBaseStyle, formLabelStyle, rowButtonsStyle } from "../../form-components/form-styles";
import { updateDescriptionList } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import FormActionStateMessage from "../../form-components/form-action-message";
import { UpdateTaskDescriptionList } from "./buttons";

const initialState = {
    message: "",
};

export const UpdateDescriptionListForm = ({ list }: { list: TaskDescriptionList }) => {
    const updateDescriptionListWithParams = updateDescriptionList.bind(null, `${list.id}`, list.descriptions);
    const [state, formAction] = useFormState(updateDescriptionListWithParams, initialState);
    return (
        <form
            name="updateDescriptionListForm"
            id="updateDescriptionListForm"
            action={formAction}
            className="flex flex-col gap-y-1 justify-start w-full"
        >
            <input
                type="hidden"
                name="taskId"
                id="taskId"
                value={list.task_id}
            />
            <label className={`${formLabelStyle}`}>
                <p>Title</p>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className={`${fieldBaseStyle}`}
                    defaultValue={list.title}
                />
            </label>
            <div className="flex justify-between">
                <Link href={`/tasks/${list.task_id}/edit`} className={`${rowButtonsStyle}`} >
                    Cancel
                </Link>
                <UpdateTaskDescriptionList className={`${rowButtonsStyle}`} >
                    Update list
                </UpdateTaskDescriptionList>
            </div>
            <FormActionStateMessage state={state} />
        </form >
    );
};

export default UpdateDescriptionListForm;