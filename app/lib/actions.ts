'use server'
import { revalidatePath, revalidateTag } from "next/cache";
import {z} from "zod";

export const createTaskCategory = async (prevState: any, formData: FormData) => {
    const TaskCategoryCreateSchema = z.object({
        title: z.string().min(1),
        description: z.string().nullable(),
    })

    const validatedFields = TaskCategoryCreateSchema.safeParse({
        title: formData.get("taskCategoryTitle"),
        description: formData.get("description"),
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


export const deleteTaskCategory = async (prevState: any, formData: FormData) => {
    const schema = z.object({
        id: z.string().min(1),
        title: z.string().min(1),
    });

    const validatedFields = schema.parse({
        id: formData.get("taskCategoryId"),
        title: formData.get("taskCategoryTitle"),
    });

    try {
        const res = await fetch(
            `http://localhost:3000/api/taskcategories/delete/${validatedFields.id}`,
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

        return {message: `Deleted task category ${validatedFields.title}`};
    } catch (err) {
        console.error("Failed to delete task category: ", err);
        return {message: "Failed to delete tasks category"};
    };
};