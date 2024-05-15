import { cookies } from 'next/headers'

// Task category operations
export const fetchTaskCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKCATEGORIES}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      // cache: 'no-store',
      next: { tags: ['taskcategories'] }
    }
  )
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const fetchTaskCategoryById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKCATEGORIES}/${id}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: ['taskcategory'] }
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch task category data')
  }
  return res.json()
}

// Task operations

export const fetchUserTasks = async (prevState: any) => {
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. No user tasks fetched.'
    }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/user-tasks`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`
      },
      mode: 'cors',
      next: { tags: ['usertasks'] }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch users tasks.')
  }

  return res.json()
}

export const fetchTasks = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: ['tasks'] }
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch tasks data.')
  }
  return res.json()
}

export const fetchTaskById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${id}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: ['task'] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task data.`)
  }
  return res.json()
}

export const fetchTaskDescriptionLists = async (taskId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${taskId}/descriptionlists`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`descriptionlists`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description lists`)
  }
  return res.json()
}

export const fetchTaskDescriptionListById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`descriptionlist`] }
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch description list ${id}`)
  }

  return res.json()
}

export const fetchListDescriptions = async (taskDescriptionListId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${taskDescriptionListId}/descriptions`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`descriptions`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description list descriptions`)
  }
  return res.json()
}
