function BlockTitle({ children }) {
  return (
    <p className="font-bold flex bg-gray-500 text-white py-2 px-4 rounded-t-md flex justify-between items-center">
        {children}
    </p>
  )
};

export default BlockTitle;
