
function Toast({ message, type }) {
  const bgColor =
  type === "success"
    ? "bg-green-500"
    : type === "error"
    ? "bg-red-500"
    : "bg-yellow-500";
  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white p-4 rounded-lg shadow-lg`}>
      <p>{message}</p>
    </div>
  )
}

export default Toast
