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