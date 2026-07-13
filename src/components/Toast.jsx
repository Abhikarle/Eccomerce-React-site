
function Toast({ message, type, showToast }) {
  const bgColor =
  type === "success"
    ? "bg-green-500"
    : type === "error"
    ? "bg-red-500"
    : "bg-yellow-500";

  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white p-4 rounded-lg shadow-lg transition-all${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} duration-300`}>
      <p>{message}</p>
    </div>
  )
}

export default Toast
