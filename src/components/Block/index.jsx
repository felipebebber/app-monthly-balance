import BlockTitle from "./Title";

function Block({ children, title = false, className = null, Modal = false }) {
  return (
    <div className={`shadow-sm rounded-md bg-blue-50 ${className ? className : ''}`}>
      <div className="flex flex-col h-full">
        {title && <BlockTitle>
          {title}{Modal && <Modal />}
        </BlockTitle>}
        <div className="flex-1 flex-col flex overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Block;
