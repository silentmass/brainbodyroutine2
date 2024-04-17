import { ListDescription } from "@/app/lib/definitions";
import DescriptionCard from "./card";

export default function DescriptionsCardList({ descriptions }: { descriptions: ListDescription[] }) {
    return (
        descriptions.map((description) => (
            <DescriptionCard key={`${description.id}`} description={description} />
        ))
    );
}