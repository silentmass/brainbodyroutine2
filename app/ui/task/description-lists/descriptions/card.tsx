import { ListDescription } from "@/app/lib/definitions";
import { DeleteListDescription } from "./buttons";

export default function DescriptionCard({ description }: { description: ListDescription }) {
    return (
        <div className="flex justify-between">
            <div>{description.description}</div>
            <div><DeleteListDescription id={`${description.id}`} /></div>
        </div>
    );
}