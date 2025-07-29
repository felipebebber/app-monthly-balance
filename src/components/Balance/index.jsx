import List from "./List";
import Block from "../Block";

function Balance() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="font-bold flex">
        Balanço
      </p>
      <Block className="flex-1 overflow-auto px-0 py-0">
        <List />
      </Block>
      <p className="font-bold flex justify-between">
        <span>Gasto Total</span>
        <span>Total</span>
      </p>
    </div>
  )
};

export default Balance;
