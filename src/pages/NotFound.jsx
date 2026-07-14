import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'
function NotFound() {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6'>
      <SearchX className="w-24 h-24 text-gray-900 mb-6" />
      <h2 className="text-3xl font-bold mt-4">
          Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        🏠 Back to Home
      </Link>
    </div>
  )
}

export default NotFound
