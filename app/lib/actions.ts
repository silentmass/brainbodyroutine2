'use server'
import { error } from "console";
import {revalidateTag } from "next/cache";
import { title } from "process";
import {z, ZodObject} from "zod";

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
});

const TaskWithIdSchema = z.object({
    id: z.number().min(1),
    title: z.string().min(1),
    is_active: z.boolean(),
    task_category_id: z.number().min(1),
});

const TaskDescriptionListSchema = z.object({
    title: z.string().min(1),
    task_id: z.number().min(1),
});

const TaskDescriptionListWithIdSchema = z.object({
    title: z.string().min(1),
    task_id: z.number().min(1),
});

const ListDescriptionSchema = z.object({
    description: z.string().min(1),
    description_list_id: z.number().min(1),
});

const ListDescriptionWithIdSchema = z.object({
    id: z.number().min(1),
    description: z.string().min(1),
    description_list_id: z.number().min(1),
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
            console.error("Failed create task category revalidate: ", revalidateErr);
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
            revalidateTag("taskcategory");
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
    const is_active = formData.get("isActive") === "on" ? true : false;
    const taskCategoryIdValue = formData.get("taskCategoryId")
    const task_category_id = taskCategoryIdValue !== null && typeof taskCategoryIdValue === "string" && taskCategoryIdValue !== "" 
    ? parseInt(taskCategoryIdValue) 
    : null;

    const validatedFields = TaskSchema.safeParse({
        title: formData.get("taskTitle"),
        is_active: is_active,
        task_category_id: task_category_id,
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {errors: validatedFields.error.flatten().fieldErrors};
    };

    const data = validatedFields.data;

    try {
        const res = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify(data),
        });

        if(!res.ok) {
            throw new Error("Failed to fetch create task");
        };
    
        try {
            revalidateTag("tasks");
        } catch (revalidateErr) {
            console.error("Failed to create task revalidate: ", revalidateErr);
        };

        return {message: `Task: ${data.title} created`};
    } catch (err) {
        console.error(`Failed to create a task: ${data.title}`, err);
        return {message: `Failed to create a task: ${data.title}`};
    };
;}

export const deleteTask = async (id: string) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/tasks/${id}/delete`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
            }
        )

        if (!res.ok) {
            throw new Error("Failed to fetch delete task");
        }

        try {
            revalidateTag("tasks");
        } catch (revalidateErr) {
            console.error(`Failed to delete task revalidate: `, revalidateErr);
        };

        return ({message: `Deleted task: ${id}`});
    } catch (err) {
        console.error(`Failed to delete task: ${id}`);
        return ({message: `Failed to delete task: ${id}`});
    };
};

export const updateTask = async (id: string, prevState: any, formData: FormData) => {
    const isActive = formData.get("taskIsActive") === "on" ? true : false;
    const taskCategoryIdValue = formData.get("taskCategoryId")
    const task_category_id = taskCategoryIdValue !== null && typeof taskCategoryIdValue === "string" && taskCategoryIdValue !== "" 
    ? parseInt(taskCategoryIdValue) 
    : null;

    const validatedFields = TaskWithIdSchema.safeParse({
        id: parseInt(id),
        title: formData.get("taskTitle"),
        is_active: isActive,
        task_category_id: task_category_id,
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {errors: validatedFields.error.flatten().fieldErrors};
    }

    const data = validatedFields.data;

    try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}/update`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(data),
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch update task ${id}`);
        }

        try {
            revalidateTag("task");
            revalidateTag("tasks");
        } catch (revalidateErr) {
            console.error(`Failed to update task revalidate: `, revalidateErr);
        }
        return {message: `Updated task ${id}`, redirectTo: "/tasks"};
    } catch (err) {
        console.error(`Failed to fetch update task ${id}`, err)
        return {message: `Failed to fetch update task ${id}`, redirectTo: prevState.redirectTo};
    };
}

// Description list actions

export const createTaskDescriptionList = async (taskId: string, prevState: any, formData: FormData) => {
    const validatedFields = TaskDescriptionListSchema.safeParse({
        title: formData.get("taskDescriptionListTitle"),
        task_id: parseInt(taskId),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {errors: validatedFields.error.flatten().fieldErrors};
    }

    const data = validatedFields.data;

    try {
        const res = await fetch(
            `http://localhost:3000/api/taskdescriptionlists/${taskId}`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(data),
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch task description list create ${taskId}`)
        }

        try {
            revalidateTag("descriptionlists");
        } catch (revalidateErr) {
            console.error("Failed to fetch task description list create revalidate: ", revalidateErr);
        }

        return {message: `Create task description list ${data.title}`, redirectTo: `/tasks/${taskId}/edit`};
    } catch (err) {
        console.error(`Failed to fetch task description list create ${taskId}`, err);
        return {message: `Failed to fetch task description list create ${taskId}`, redirectTo: prevState.redirectTo};
    }
};

export const deleteTaskDescriptionList = async (id:string) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/taskdescriptionlists/${id}/delete`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
            }
        );
    
        if (!res.ok) {
            throw new Error(`Task description list delete fetch failed ${id}`);
        }

        try {
            revalidateTag("descriptionlists")
        } catch (revalidateErr) {
            console.error(`Task description list delete revalidate failed ${id}`, revalidateErr);
        }

        return {message: `Task description list ${id} deleted`};

    } catch (err) {
        console.error(`Task description list delete fetch failed ${id}`, err);
        return {errors: `Task description list delete fetch failed ${id}`};
    }
}

// Description actions


export const createListDescription = async (listId: string, prevState: any, formData: FormData) => {
    const validatedFields = ListDescriptionSchema.safeParse({
        description: formData.get("description"),
        description_list_id: parseInt(listId),
        owner: parseInt(listId),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {errors: validatedFields.error.flatten().fieldErrors};
    }

    const data = validatedFields.data;

    console.log(data)

    try {
        const res = await fetch(
            `http://localhost:3000/api/descriptionlists/${listId}/descriptions`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(data)
            }
        )

        if (!res.ok) {
            throw new Error(`List description create fetch failed`);
        }

        try {
            revalidateTag(`descriptions`);
            revalidateTag(`descriptionlist`);
            revalidateTag(`descriptionlists`);
        } catch (revalidateErr) {
            console.error(`List description create revalidate failed: `, revalidateErr);
        }

        return {message: `List description created`};
    } catch (err) {
        console.error(`List description create fetch failed`, err);
        return {errors: `List description create fetch failed`};
    };
};

export const deleteListDescription = async (id: string, prevState: any, formData:FormData) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/descriptions/${id}/delete`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
            }
        )

        if (!res.ok) {
            throw new Error(`List description delete fetch failed`)
        }

        try {
            revalidateTag(`descriptions`);
            revalidateTag(`descriptionlist`);
            revalidateTag(`descriptionlists`);
        } catch (revalidateErr) {
            console.log(`List description deleted revalidation failed`, revalidateErr);
        };

        return {message: `List description deleted`};
    } catch(err) {
        console.error(`List description delete fetch failed`, err);
        return {errors: `List description delete fetch failed`};
    }
}