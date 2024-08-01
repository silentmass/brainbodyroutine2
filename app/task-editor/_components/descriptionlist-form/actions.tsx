'use server'

export async function createDescriptionList (
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData)
  const descriptions = Object.keys(rawFormData).filter(
    entry => entry.search(/^updateDescription_/) !== -1
  )
  const header = rawFormData['listHeader']
  console.log(descriptions, header)

  await new Promise(res => setTimeout(res, 2000))

  return {
    message: 'Success',
    errors: ['none', 'cool'],
    fieldErrors: { title: ['error1', 'error2'] }
  }
}
