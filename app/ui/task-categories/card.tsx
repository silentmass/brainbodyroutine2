import { TaskCategory } from "@/app/lib/definitions";
import { DeleteTaskCategory, UpdateTaskCategory } from "./buttons";

export const CategoryCard = ({ category }: { category: TaskCategory }) => {
    return (
        <div key={category.id} className="flex w-full justify-between p-5 bg-slate-900">
            <p className="flex min-w-2xl">{category.title}</p>
            <UpdateTaskCategory id={`${category.id}`} />
            <DeleteTaskCategory id={`${category.id}`} />
        </div>
    );
}

export default CategoryCard;