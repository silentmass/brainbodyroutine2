import { TaskCategory } from "@/app/lib/definitions";
import CategoryCard from "./card";

export const CategoryCardList = ({ categories }: { categories: TaskCategory[] }) => {
    return (<>{categories.map((category) => (<CategoryCard key={category.id} category={category} />))}</>);
};

export default CategoryCardList;