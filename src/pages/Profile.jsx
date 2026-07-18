import useAuth from '../hooks/useAuth'
import {useState} from 'react'
import { User, Mail, Calendar,  } from 'lucide-react'
import Loading from '../components/LoadingSpinner'
import ProfileItem from '../components/ProfileItem'
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
  const date = new Date(user.metadata.creationTime);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <label className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300">
            <User size={18} />
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
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
        <button onClick={handleSave} disabled='saving' className='bg-yellow-500 w-full hover:bg-yellow-600 text-white rounded-lg transition-all duration-300 active:scale-95 py-3'>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={handleLogout} className='bg-red-500 w-full hover:bg-red-600 text-white rounded-lg transition-all duration-300 active:scale-95 mt-5 py-3'>
              Logout
          </button>
      </div>
    </div>
  )
}

export default Profile
