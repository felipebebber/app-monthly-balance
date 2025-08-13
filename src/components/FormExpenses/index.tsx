import { useState } from "react";
import Form from "./Form";

function AddExpenses() {
    const [btnAddMobile, setBtnAddMobile] = useState(false);

    return (
      <>
          <button onClick={() => setBtnAddMobile(!btnAddMobile)} className={`block md:hidden px-2 py-1 border border-blue-500 text-blue-500 ml-auto rounded text-sm data-[active=true]:bg-blue-500 data-[active=true]:text-white`} data-active={btnAddMobile}>Adicionar Dispesa</button>
          <div className={`hidden md:block data-[active=true]:block data-[active=true]:mt-3`} data-active={btnAddMobile}>
            <Form />
          </div>
      </>
    )
  
};

export default AddExpenses;
