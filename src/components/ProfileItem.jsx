function ProfileItem({ icon, label, children }) {
  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300">
        {icon}
        {label}
      </h3>

      <p className="mt-1 text-black dark:text-white">
        {children}
      </p>
    </div>
  );
}

export default ProfileItem;
