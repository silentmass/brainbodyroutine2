import { ListDescription } from "@/app/lib/definitions";
import DescriptionCard from "./card";

export default function DescriptionsCardList({ descriptions }: { descriptions: ListDescription[] }) {
    return (
        <div className="flex flex-col w-full gap-y-1">
            {
                descriptions.map((description) => (
                    <DescriptionCard key={`${description.id}`} description={description} />
                ))
            }
        </div>

    );
}