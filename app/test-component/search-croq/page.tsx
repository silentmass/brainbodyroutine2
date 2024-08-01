import SearchCroq from './SearchCroqForm'

export default function Page () {
  return (
    <div className='page h-full items-center'>
      <div className='flex'>
        <div className='card'>
          <div className='flex flex-col gap-5'>
            <h2>Search CROQ</h2>
            <SearchCroq />
          </div>
        </div>
      </div>
    </div>
  )
}
