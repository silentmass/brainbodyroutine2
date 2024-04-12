
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
    throw new Error("Failed to fetch data");
  }
  return res.json()
};
