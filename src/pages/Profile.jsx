import useAuth from '../hooks/useAuth'
import {useState} from 'react'
import { User } from 'lucide-react'
import Loading from '../components/LoadingSpinner'
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useToast from '../hooks/useToast'
import {auth} from '../firebase/firebase'
function Profile() {
  const { showToastMessage } = useToast();
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);

  if (!user) {
    return <Loading />
  }
  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }
    try {
      setSaving(true);
      await updateProfile(user, {
        displayName: name,
      });
      await user.reload();
      setUser(auth.currentUser);
      setName(auth.currentUser.displayName);
      showToastMessage("Profile updated successfully!", "success");
    }
    catch (error) {
      console.error(error);
      showToastMessage("Profile update failed!", "error");
    } finally {
      setSaving(false);
    }
  }

const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error(error);
    showToastMessage("Profile logout failed!", "error");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">
              {(user.displayName || user.email).charAt(0).toUpperCase()}
            </span>
          </div>

        <p className="text-gray-500 dark:text-gray-500">
          {user.email}
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
        My Profile
      </h1>

        {/* Name Input */}
      <div className="mb-6">
        <label className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300">
          <User size={18} />
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full px-3 py-2 border rounded-xl border-gray-400 dark:border-gray-800 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
          <button onClick={handleSave} disabled={saving} className='bg-blue-600 w-full hover:bg-blue-800 text-white hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed mt-4 rounded-lg transition-all duration-300 active:scale-95 py-3'>

            {saving ? "Saving..." : "Save Changes"}

          </button>

          <button onClick={handleLogout} className='bg-red-500 w-full hover:bg-red-600 text-white rounded-lg hover:cursor-pointer transition-all duration-300 active:scale-95 mt-5 py-3'>

              Logout

          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
