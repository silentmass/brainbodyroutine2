import { headers } from "next/headers";

export const fetchTaskCategories = async () => {
  const res = await fetch('http://localhost:3000/api/taskcategories', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    // cache: 'no-store',
    next: {tags: ["taskcategories"]},
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
};

export const fetchTaskCategoryById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/taskcategory/${id}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    next: {tags: ["taskcategory"]},
  });
  if (!res.ok) {
    throw new Error("Failed to fetch task category data");
  }
  return res.json()
};

export const fetchTasks = async () => {
  const res = await fetch('http://localhost:3000/api/tasks/', {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    next: {tags: ["tasks"]},
  });
  if(!res.ok) {
    throw new Error("Failed to fetch tasks data.");
  };
  return res.json();
};

export const fetchTaskById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
      next: {tags: ["task"]},
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch task data.`);
  }
  return res.json();
};

export const fetchTaskDescriptionLists = async (taskId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/taskdescriptionlists/${taskId}`,
    {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
      next: {tags: ["descriptionlists"]},
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description lists`);
  }
  return res.json();
};

export const fetchListDescriptions = async (taskDescriptionListId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/taskdescriptionlists/${taskDescriptionListId}/descriptions`,
    {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
      next: {tags: ["descriptions"]},
    }
  );
  if(!res.ok) {
    throw new Error(`Failed to fetch task description list descriptions`);
  }
  return res.json();
}