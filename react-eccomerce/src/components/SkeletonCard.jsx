function SkeletonCard() {
  return (
    <div className='bg-white shadow-md p-4 animate-pulse rounded-lg'>
      <div className='w-full h-48 bg-gray-400 rounded'>
      </div>
      <div className="h-6 bg-gray-300 rounded mt-4 w-3/4">
      </div>
      <div className="h-5 bg-gray-300 rounded mt-3 w-1/3">
      </div>
      <div className="h-10 bg-gray-300 rounded mt-4 w-full">
      </div>
    </div>
  )
}

export default SkeletonCard
