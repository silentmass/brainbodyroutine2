'use client'
import { useFormState } from "react-dom";
import { CreateTaskDescriptionList } from "./buttons";
import { createTaskDescriptionList } from "@/app/lib/actions";

const initialState = {
    message: "",
};

export default function CreateTaskDescriptionListForm({ taskId }: { taskId: string }) {
    const createTaskDescriptionListWithTaskId = createTaskDescriptionList.bind(null, `${taskId}`);
    const [state, formAction] = useFormState(createTaskDescriptionListWithTaskId, initialState)
    return (
        <div>
            Create Task {taskId} Description List
            <form
                name="createTaskDescriptionListForm"
                id="createTaskDescriptionListForm"
                action={formAction}
            >
                <label>
                    <p>Title</p>
                    <input
                        type="text"
                        name="taskDescriptionListTitle"
                        id="taskDescriptionListTitle"
                        required
                        className={`formField`}
                    />
                </label>
                <CreateTaskDescriptionList />
            </form>
        </div>
    );
};