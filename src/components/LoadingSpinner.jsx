
function LoadingSpinner() {
  return (
     <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
      <div className="h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-gray-500 dark:text-gray-400 font-medium">
        Loading...
      </p>
    </div>
  )
}

export default LoadingSpinner
