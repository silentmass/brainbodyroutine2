'use client'
import { updateListDescription } from "@/app/lib/actions";
import { ListDescription } from "@/app/lib/definitions";
import FormActionStateMessage from "@/app/ui/form-components/form-action-message";
import { formLabelStyle, rowButtonsStyle } from "@/app/ui/form-components/form-styles";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
    redirectTo: null,
};

export default function EditListDescriptionForm({ description }: { description: ListDescription }) {
    const updateListDescriptionWithId = updateListDescription.bind(null, `${description.id}`, `${description.description_list_id}`);
    const [state, formAction] = useFormState(updateListDescriptionWithId, initialState);

    return (
        <form
            name="editListDescription"
            id="editListDesription"
            action={formAction}
            className="flex flex-col w-full"
        >
            <div className={`flex w-full justify-between h-full items-center`}>
                <label className={`${formLabelStyle}`}>
                    <p>Description</p>
                    <textarea
                        name="description"
                        id="description"
                        defaultValue={description.description}
                        required className="flex w-full dark:bg-transparent border dark:text-white p-2 dark:border-slate-800" ></textarea>
                </label>
                <button type="submit" className={`${rowButtonsStyle}`}>Update</button>
            </div>
            <FormActionStateMessage state={state} />
        </form>
    );
};