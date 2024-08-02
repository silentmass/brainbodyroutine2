export default function Page ({ params }: { params: { id: string } }) {
  return <div>Button {parseInt(params.id)}</div>
}
