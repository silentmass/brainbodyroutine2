import { TaskDescriptionList } from "@/app/lib/definitions";
import DescriptionLists from "./card-list";

export default function DescriptionListsTable(
    { taskDescriptionLists }: { taskDescriptionLists: TaskDescriptionList[] }
) {
    const isList = taskDescriptionLists && taskDescriptionLists.length;

    return (
        <div className="flex flex-col w-full bg-slate-950 gap-y-1">
            {
                (isList)
                    ? <DescriptionLists lists={taskDescriptionLists} />
                    : <></>
            }
        </div>
    );
};