// export const APIHOST = "127.0.0.1:3000"
export type UserCreate = {
  username: string
  email: string
  full_name: string
  disabled: boolean
  password: string
}

export type UserInDB = {
  username: string
  email: string | null
  full_name: string | null
  disabled: boolean | null
  hashed_password: string
}

export type UserNextAuth = {
  id: number
  username: string
  email: string | null
  full_name: string | null
  disabled: boolean | null
  hashed_password: string
}

export type User = {
  id: string
  username: string
  name: string
  email: string
  password: string
  disabled: boolean | null
  hashed_password: string
}

export interface TaskCategoryBase {
  title: string
  description: string | null
}

export interface TaskCategory extends TaskCategoryBase {
  id: number
}

export interface FormAction {
  prevState: { message: string }
  formData: FormData
}

export interface TaskBase {
  title: string
  is_active: boolean
  task_category_id: number
  tags: Tag[] | null
  description_lists: TaskDescriptionList[] | null
}

export interface Task extends TaskBase {
  id: number
}

export interface ListDescriptionBase {
  description: string
  description_list_id: number
}

export interface ListDescription extends ListDescriptionBase {
  id: number
}

export interface TaskDescriptionListBase {
  title: string
  task_id: number
}

export interface TaskDescriptionList extends TaskDescriptionListBase {
  id: number
  descriptions: ListDescription[] | null
}

export interface ListDescriptionBase {
  description: string
  description_list_id: number
}

export interface ListDescription extends ListDescriptionBase {
  id: number
}

export interface TagBase {
  title: string
  task_id: number
}

export interface Tag extends TagBase {
  id: number
}
