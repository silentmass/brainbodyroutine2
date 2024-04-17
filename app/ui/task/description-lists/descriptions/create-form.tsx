'use client'
import { createListDescription } from "@/app/lib/actions";
import { TaskDescriptionList } from "@/app/lib/definitions";
import { useFormState } from "react-dom";
import { CreateListDescription } from "./buttons";
import { formLabelStyle } from "@/app/ui/form-components/form-styles";
import Link from "next/link";

const initialState = {
    message: "",
};

export default function CreateListDescriptionForm(
    { descriptionList, redirectTo }
        : { descriptionList: TaskDescriptionList, redirectTo: string }
) {
    const createListDescriptionWithId = createListDescription.bind(null, `${descriptionList.id}`);
    const [state, formAction] = useFormState(createListDescriptionWithId, initialState);
    return (
        <form
            name="createListDescriptionForm"
            id="createListDescriptionForm"
            action={formAction}
            className="flex flex-col gap-y-1 justify-start w-full items-start"
        >
            <div className="flex flex-col gap-y-1 w-full">
                <label className={`${formLabelStyle}`}>
                    <p>Description</p>
                    <textarea
                        name="description"
                        id="description"
                        className="flex dark:bg-transparent border dark:text-white w-full"
                    >

                    </textarea>
                </label>
                <div className="flex w-full justify-between">
                    <div className="flex justify-center p-5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 w-full">
                        <CreateListDescription />
                    </div>
                </div>
            </div>
        </form>
    );
}