import BlockTitle from "./title";

function Block({ children, title = false, className = null }) {
  return (
    <div className={`p-4 shadow-sm rounded-md bg-blue-50 ${className ? className : ''}`}>
      <div className="flex flex-col h-full">
        {title && <BlockTitle>{title}</BlockTitle>}
        <div className="flex-1 flex-col flex overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Block;
