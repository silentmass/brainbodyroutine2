import { TaskDescriptionList } from "@/app/lib/definitions";
import DescriptionListCard from "./card";

export const DescriptionLists = ({ lists }: { lists: TaskDescriptionList[] }) => {
    return (
        <>
            {
                lists.map((list) => (
                    <DescriptionListCard
                        key={list.id}
                        taskDescriptionList={list}
                    />
                ))
            }
        </>
    );
};

export default DescriptionLists;