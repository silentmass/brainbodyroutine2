import { TaskDescriptionList } from "@/app/lib/definitions";
import { DeleteTaskDescriptionList } from "./buttons";
import { fetchListDescriptions } from "@/app/lib/data";
import ListDescriptionsTable from "./descriptions/table";

export const DescriptionListCard = ({ taskDescriptionList }: { taskDescriptionList: TaskDescriptionList }) => {
    return (
        <div className="flex flex-col bg-slate-800 gap-y-3 p-3">
            <div className="flex justify-between w-full">
                <p>{taskDescriptionList.title}</p>
                <DeleteTaskDescriptionList taskDescriptionListId={`${taskDescriptionList.id}`} />
            </div>
            <ListDescriptionsTable descriptions={taskDescriptionList.descriptions} />
        </div>

    );
}