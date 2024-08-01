'use server'

import { CroqSearchQuerySchema } from '../definitions'

export async function getCroqSearch (prevState: any, formData: FormData) {
  // Testing form pending state
  // await new Promise(res => setTimeout(res, 1000))

  const searchQuery = formData.get('searchQuery')

  const validatedFields = CroqSearchQuerySchema.safeParse({
    searchQuery: searchQuery
  })

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_CROQ}/search`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        next: { tags: ['croqsearches'] },
        body: JSON.stringify(data),
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch search query. Response error!`)
    }

    console.log(res)

    return { ...prevState, message: res.json() }
  } catch (err) {
    console.error('Failed to fetch search query')
    return { ...prevState, message: `Failed to fetch search query` }
  }
}
