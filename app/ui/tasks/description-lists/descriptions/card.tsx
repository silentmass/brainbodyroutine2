import { ListDescription } from "@/app/lib/definitions";
import { DeleteListDescription } from "./buttons";
import EditListDescriptionForm from "./edit-form";

export default function DescriptionCard({ description }: { description: ListDescription }) {
    return (
        <div className="formField flex justify-between w-full">
            <div className="flex w-full items-center "><EditListDescriptionForm description={description} /></div>
            <div className="p-5"><DeleteListDescription id={`${description.id}`} /></div>
        </div>
    );
}