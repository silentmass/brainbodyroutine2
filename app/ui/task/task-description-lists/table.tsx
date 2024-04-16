import { TaskDescriptionList } from "@/app/lib/definitions";
import Link from "next/link";
import { DescriptionListCard } from "./card";


export default function TaskDescriptionListsTable(
    { taskDescriptionLists }: { taskDescriptionLists: TaskDescriptionList[] }
) {
    return (
        <div className="flex flex-col w-full p-3 bg-slate-950 gap-y-5">
            <p>Description lists</p>
            {
                (taskDescriptionLists && taskDescriptionLists.length)
                    ? taskDescriptionLists.map((taskDescriptionList) => (
                        <DescriptionListCard
                            key={taskDescriptionList.id}
                            taskDescriptionList={taskDescriptionList}
                        />
                    ))
                    : <p>No description lists</p>
            }
        </div>
    );
};