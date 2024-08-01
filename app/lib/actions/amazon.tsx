'use server'
export async function getAmazonAuthorizationGrantCode (
  prevState: any,
  formData: FormData
) {
  console.log('getAmazonAuthorizationGrantCode')

  await new Promise(res => setTimeout(res, 1000))

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_AWS}/search`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        next: { tags: ['awssearches'] }
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch search query. Response error!`)
    }
    // console.log(res.json())

    return { ...prevState, message: res.json() }
  } catch (err) {
    console.error('Failed to fetch AWS search query')
    return { ...prevState, message: `Failed to fetch AWS search query` }
  }
}
