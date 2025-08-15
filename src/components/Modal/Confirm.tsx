function Confirm({ callback1, callback2 }) {
  return (
    <div className="flex justify-center gap-8 mt-6">
        <button className="px-3 text-sm uppercase font-medium py-1 block min-w-0 rounded-md bg-red-200 hover:bg-red-300 cursor-pointer" onClick={() => callback2(false)}>Não</button>
        <button className="px-3 text-sm uppercase font-medium py-1 block min-w-0 rounded-md bg-blue-100 hover:bg-blue-300 cursor-pointer" onClick={() => {
            callback1();
            callback2(false);
        }}>Sim</button>
    </div>
  )
};

export default Confirm;
