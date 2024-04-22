import { ListDescription } from '@/app/lib/definitions'
import DescriptionsCardList from './card-list'

export default function ListDescriptionsTable ({
  descriptions
}: {
  descriptions: ListDescription[] | null
}) {
  return descriptions && descriptions.length ? (
    <>
      <DescriptionsCardList descriptions={descriptions} />
    </>
  ) : (
    <p>No descriptions</p>
  )
}
