import { useEffect } from "react";
import { TaskCategory } from "../../lib/definitions";
import { DeleteTaskCategory, UpdateTaskCategory } from "./buttons";
import clsx from "clsx";
import CategoryCard from "./card";
import CategoryCardList from "./card-list";

export default function TaskCategoriesTable({ taskCategories }: { taskCategories: TaskCategory[] | any }) {
    return ((taskCategories) ? <CategoryCardList categories={taskCategories} /> : <p>No task categories</p>);
};