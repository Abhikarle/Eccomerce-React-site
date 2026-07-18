import useAuth from '../hooks/useAuth'
import { User, Mail, Calendar,  } from 'lucide-react'
import Loading from '../components/LoadingSpinner'
import ProfileItem from '../components/ProfileItem'
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) {
    return <Loading />
  }

const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};
  const date = new Date(user.metadata.creationTime);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <ProfileItem
          icon={<User size={18} />}
          label="Name"
        >
          {user.displayName || user.email}
        </ProfileItem>
        <ProfileItem
          icon={<Mail size={18} />}
          label="Email"
        >
          {user.email}
        </ProfileItem>
        <ProfileItem
          icon={<Calendar size={18} />}
          label="Member Since"
        >
          {date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </ProfileItem>
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
          <button onClick={handleLogout} className='bg-red-500 w-full hover:bg-red-600 text-white rounded-lg transition-all duration-300 active:scale-95 py-3'>
              Logout
          </button>
      </div>
    </div>
  )
}

export default Profile
