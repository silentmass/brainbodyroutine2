'use server'
import {revalidateTag } from "next/cache";
import {z} from "zod";

const TaskCategorySchema = z.object({
    title: z.string().min(1),
    description: z.string().nullable(),
});

const TaskCategoryWithIdSchema = z.object({
    id: z.number().min(1),
    title: z.string().min(1),
    description: z.string().nullable(),
});

const TaskSchema = z.object({
    title: z.string().min(1),
    is_active: z.boolean(),
    task_category_id: z.number().min(1),
    tag_id: z.number().nullable(),
});

const TaskWithIdSchema = z.object({
    id: z.number().min(1),
    title: z.string().min(1),
    is_active: z.boolean(),
    task_category_id: z.number().min(1),
    tag_id: z.number().nullable(),
});

export const createTaskCategory = async (prevState: any, formData: FormData) => {
    const validatedFields = TaskCategorySchema.safeParse({
        title: formData.get("taskCategoryTitle"),
        description: formData.get("taskCategoryDescription"),
    });

    if(!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors};
    }

    const data = validatedFields.data;

    try {
        const res = await fetch(
            "http://localhost:3000/api/taskcategories",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(data),
            }
        );
    
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        try {
            revalidateTag("taskcategories");
        } catch (revalidateErr) {
            console.error("Failed create task category revalidate: ", revalidateErr)
        }
        
        return {message: `Created task category ${data.title}`};
    } catch (err) {
        console.error("Failed to create task category:", err);
        return { message: "Failed to create title and description"};
    };
};

export const updateTaskCategory = async (id: string, prevState: any, formData: FormData) => {
    const validatedFields = TaskCategoryWithIdSchema.safeParse({
        id: parseInt(id),
        title: formData.get("taskCategoryTitle"),
        description: formData.get("taskCategoryDescription"),
    });

    if(!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors};
    };

    const data = validatedFields.data;

    try {
        const res = await fetch(
            `http://localhost:3000/api/taskcategory/${id}/update`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(data),
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        try {
            revalidateTag("taskcategories");
            
        } catch (revalidateErr) {
            console.error("Failed update task category revalidate: ", revalidateErr)
        };
        
        return {message: `Updated task category ${data.title}`, redirectTo: "/task-categories"};
    } catch (err) {
        console.error("Failed to update task category:", err);
        return { message: "Failed to update title and description", redirectTo: prevState.redirectTo};
    };
};

export const deleteTaskCategory = async (id: string) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/taskcategory/${id}/delete`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
            }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch delete task category')
        }

        try {
            revalidateTag("taskcategories");
        } catch (revalidateErr) {
            console.error("Failed delete task category revalidate: ", revalidateErr)
        }

        return {message: `Deleted task category`};
    } catch (err) {
        console.error("Failed to delete task category: ", err);
        return {message: "Failed to delete tasks category"};
    };
};

export const createTask = async (prevState: any, formData:FormData) => {
    const validatedFields = TaskSchema.safeParse({
        title: formData.get("taskTitle"),
        is_active: formData.get("isActive"),
        task_category_id: formData.get("taskCategoryId"),
        tag_id: formData.get("taskTagId"),
    });

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors};
    };

    const data = validatedFields.data;

    try {
        return {message: "Task created"};
    } catch (err) {
        console.error("Failed to create a task.", err);
        return {message: "Failed to create a task."};
    };
;}