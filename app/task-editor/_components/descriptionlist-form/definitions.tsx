export type bullet = {
  id: string
  body: string
}

export interface DescriptionListHeader {
  title: string | null
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
}
