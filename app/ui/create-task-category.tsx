'use client'
import { FormEvent } from "react";
import axios from "axios";

export default function CreateTaskCategory() {
    const handleCreateTaskCategorySubmit = (event: FormEvent) => {

        event.preventDefault()
        const title = (event?.target as HTMLFormElement)["taskCategoryTitle"].value;
        console.log("Submit")
        console.log("title", title)

        axios
            .post("/api/taskcategories/", { title: title, description: null })
            .then(res => {
                console.log("Created:", res)
            })
            .catch(err => {
                console.error("Failed to create task category:", err)
            });
    };

    return (
        <form
            name="createTaskCategoryForm"
            method="post"
            className="flex flex-col max-w-2xl bg-slate-900 p-3 gap-y-3 justify-center items-center"
            onSubmit={handleCreateTaskCategorySubmit}
        >
            <h2>Task category</h2>
            <label className="bg-slate-800 p-3">
                <p>Title</p>
                <input
                    type="text"
                    id="taskCategoryTitle"
                    name="taskCategoryTitle"
                    required
                    className="bg-transparent border-b border-slate-300"
                />
            </label>
            <button className="flex items-center justify-center border rounded p-3 w-fit" type="submit">Create</button>
        </form>
    );
}