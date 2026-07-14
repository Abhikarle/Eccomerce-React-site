
function Toast({ message, type, showToast }) {
  const bgColor =
  type === "success"
    ? "bg-green-500"
    : type === "error"
    ? "bg-red-500"
    : "bg-yellow-500";

  return (
    <div
      className={`
    fixed top-5 right-5 z-50
    ${bgColor}
      text-white px-5 py-3
       rounded-lg shadow-xl
        transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
    {message}
    </div>
  )
}

export default Toast
