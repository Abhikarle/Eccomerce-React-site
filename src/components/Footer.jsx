import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from "react-icons/fa";
function Footer() {

  return (
    <footer className=' border-t bg-gray-800 dark:bg-gray-950 border-gray-700  text-white mt-10'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h2 className='text-2xl font-extrabold text-green-500'>
                BigBasket Clone
            </h2>

            <p className='mt-3 text-gray-300'>
               Fresh groceries delivered to your doorstep.
            </p>
          </div>
            <div>
              <h3 className='mb-3 font-semibold'>
              Quick Links
            </h3>
            <div className='flex flex-col gap-3'>
              <Link to='/' className='hover:text-green-400 transition-colors'>Home</Link>
              <Link to='/wishlist' className='hover:text-green-400 transition-colors'>Wishlist</Link>
              <Link to='/cart' className='hover:text-green-400 transition-colors'>Cart</Link>
              <Link to='/profile' className='hover:text-green-400 transition-colors'>Profile</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">
              Connect
            </h3>
            <div className='flex gap-4'>
              <a
                href="https://github.com/Abhikarle"
                target="_blank"
                rel="noreferrer"
                className='hover:text-green-400 transition-colors'
              >
                <FaGithub size={24} />
              </a>
                <a
                href="https://linkedin.com/in/abhijeet-karle/"
                target="_blank"
                rel="noreferrer"
                className='hover:text-green-400 transition-colors'
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <hr className='my-8 border-gray-700' />
        <p className="text-center text-sm text-gray-400">
          © 2026 BigBasket Clone • Built with React + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

export default Footer
