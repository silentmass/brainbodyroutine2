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

export const fetchNullUserTasks = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: ['nullusertasks'] }
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch tasks data.')
  }
  return res.json()
}

export const fetchUserTaskById = async (id: string) => {
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value) return null
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${id}/user`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`
      },
      mode: 'cors',
      next: { tags: ['usertask'] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task data.`)
  }
  return res.json()
}

export const fetchNullUserTaskById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${id}/nulluser`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: ['nullusertask'] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task data.`)
  }
  return res.json()
}

export const fetchUserTaskDescriptionLists = async (taskId: string) => {
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value) return null

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${taskId}/descriptionlists/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`
      },
      mode: 'cors',
      next: { tags: [`userdescriptionlists`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description lists`)
  }
  return res.json()
}

export const fetchNullUserTaskDescriptionLists = async (taskId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${taskId}/descriptionlists/nulluser`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`nulluserdescriptionlists`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description lists`)
  }
  return res.json()
}

export const fetchUserTaskDescriptionListById = async (id: string) => {
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value) return null

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`
      },
      mode: 'cors',
      next: { tags: [`userdescriptionlist`] }
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch description list ${id}`)
  }

  return res.json()
}

export const fetchNullUserTaskDescriptionListById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}/nulluser`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`nulluserdescriptionlist`] }
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch description list ${id}`)
  }

  return res.json()
}

export const fetchUserListDescriptions = async (
  taskDescriptionListId: string
) => {
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value) return null

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${taskDescriptionListId}/descriptions/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`
      },
      mode: 'cors',
      next: { tags: [`userdescriptions`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description list descriptions`)
  }
  return res.json()
}

export const fetchNullUserListDescriptions = async (
  taskDescriptionListId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${taskDescriptionListId}/descriptions/nulluser`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      next: { tags: [`nulluserdescriptions`] }
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch task description list descriptions`)
  }
  return res.json()
}
