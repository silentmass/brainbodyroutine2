import { z } from 'zod'

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
  sort_order: number | null
  user_id: number | null
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

export const TaskCategorySchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable()
})

export const TaskCategoryWithIdSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  description: z.string().nullable()
})

export const TaskSchema = z.object({
  title: z.string().min(1),
  is_active: z.boolean(),
  task_category_id: z.number().min(1)
})

export const TaskWithIdSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  is_active: z.boolean(),
  task_category_id: z.number().min(1),
  sort_order: z.number().nullable()
})

export const ListDescriptionSchema = z.object({
  description: z.string().min(1),
  description_list_id: z.number().min(1)
})

export const ListDescriptionWithIdSchema = z.object({
  id: z.number().min(1),
  description: z.string().min(1),
  description_list_id: z.number().min(1)
})

export const TaskDescriptionListSchema = z.object({
  title: z.string().min(1),
  task_id: z.number().min(1)
})

export const TaskDescriptionListWithIdSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  task_id: z.number().min(1)
})

export const UserSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const UserRegisterSchema = z.object({
  username: z.string().min(1),
  email: z.coerce.string().email().nullable(),
  full_name: z.string().nullable(),
  disabled: z.boolean().nullable(),
  password: z.string().min(1)
})
