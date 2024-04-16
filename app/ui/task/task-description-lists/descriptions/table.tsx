import { ListDescription } from "@/app/lib/definitions";

const DescriptionsList = ({ descriptions }: { descriptions: ListDescription[] }) => {
    return (
        descriptions.map((description) => (
            <div key={`${description.id}`}>{description.description}</div>
        ))
    );
}

export default function ListDescriptionsTable({ descriptions }: { descriptions: ListDescription[] | null }) {

    return (
        <div>
            {(descriptions && descriptions.length)
                ? <><p>List Descriptions</p><DescriptionsList descriptions={descriptions} /></>
                : <p>No descriptions</p>
            }
        </div>
    );
};