import { ListDescription } from "@/app/lib/definitions";
import DescriptionsCardList from "./card-list";

export default function ListDescriptionsTable({ descriptions }: { descriptions: ListDescription[] | null }) {

    return (
        <div>
            {(descriptions && descriptions.length)
                ? <><p>List Descriptions</p><DescriptionsCardList descriptions={descriptions} /></>
                : <p>No descriptions</p>
            }
        </div>
    );
};