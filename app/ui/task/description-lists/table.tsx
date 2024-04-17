import { TaskDescriptionList } from "@/app/lib/definitions";
import Link from "next/link";
import { DescriptionListCard } from "./card";

export const DescriptionLists = ({ lists }: { lists: TaskDescriptionList[] }) => {
    return (
        <>
            {
                lists.map((taskDescriptionList) => (
                    <DescriptionListCard
                        key={taskDescriptionList.id}
                        taskDescriptionList={taskDescriptionList}
                    />
                ))
            }
        </>
    );
};

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