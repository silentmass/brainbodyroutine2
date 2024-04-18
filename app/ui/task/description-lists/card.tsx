import { TaskDescriptionList } from "@/app/lib/definitions";
import { DeleteTaskDescriptionList } from "./buttons";
import ListDescriptionsTable from "./descriptions/table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const DescriptionListCard = ({ taskDescriptionList }: { taskDescriptionList: TaskDescriptionList }) => {
    return (
        <div className="flex flex-col bg-slate-900 gap-y-3 p-3">
            <div className="flex justify-between w-full">
                <p>{taskDescriptionList.title}</p>
                <Link href={`/tasks/${taskDescriptionList.task_id}/description-lists/${taskDescriptionList.id}/edit`} >
                    <PencilIcon className="w-5" />
                </Link>
                <DeleteTaskDescriptionList taskDescriptionListId={`${taskDescriptionList.id}`} />
            </div>
            <ListDescriptionsTable descriptions={taskDescriptionList.descriptions} />
        </div>
    );
};

export default DescriptionListCard;