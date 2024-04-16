import { TaskDescrionList } from "@/app/lib/definitions";
import Link from "next/link";
import { DeleteTaskDescriptionList } from "./buttons";


export default function TaskDescriptionListsTable(
    { taskDescriptionLists }: { taskDescriptionLists: TaskDescrionList[] }
) {
    return (
        <div className="flex flex-col w-full p-3 bg-slate-950 gap-y-5">
            <p>Description lists</p>
            {
                (taskDescriptionLists.length)
                    ? taskDescriptionLists.map((taskDescriptionList) => (
                        <div key={taskDescriptionList.id} className="flex justify-between w-full bg-slate-800 gap-y-3 p-3">
                            <p>{taskDescriptionList.title}</p>
                            <DeleteTaskDescriptionList taskDescriptionListId={`${taskDescriptionList.id}`} />
                        </div>
                    ))
                    : <p>No description lists</p>
            }
        </div>
    );
};