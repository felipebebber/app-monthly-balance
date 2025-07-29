function Block({ children, className = null }) {
  return (
    <div className={`p-4 border border-gray-400 rounded-md bg-blue-50 ${className ? className : ''}`}>
      {children}
    </div>
  )
};

export default Block;
