export interface TaskCategoryBase {
    title: string;
    description: string|null;
};

export interface TaskCategory extends TaskCategoryBase {
    id: number;
};

export interface FormAction {
    prevState: {message: string};
    formData: FormData;
};

export interface TaskBase {
    title: string;
    is_active: boolean;
    task_category_id: number;
    tag_id: number | null;
};

export interface Task extends TaskBase {
    id: number;
};

export interface ListDescriptionBase {
    description: string;
    description_list_id: number;
};

export interface ListDescription extends ListDescriptionBase {
    id: number;
};

export interface TaskDescriptionListBase {
    title: string;
    task_id: number;
};

export interface TaskDescriptionList extends TaskDescriptionListBase {
    id: number;
    descriptions: ListDescription[] | null;
};

export interface ListDescriptionBase {
    description: string;
    description_list_id: number;
};

export interface ListDescription extends ListDescriptionBase {
    id: number;
}