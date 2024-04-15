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