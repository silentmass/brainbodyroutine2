import SearchAmazon from './SearchAmazonForm'

export default function Page () {
  return (
    <div className='page h-full items-center'>
      <div className='flex'>
        <div className='card'>
          <div className='flex flex-col gap-5'>
            <h2>Search Amazon</h2>
            <SearchAmazon />
          </div>
        </div>
      </div>
    </div>
  )
}
