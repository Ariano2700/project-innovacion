import MaterialSymbolsTable from "../../../components/icons/material-symbols/MaterialSymbolsTable";

interface ToggleTableI {
  setIsChecked: () => void;
  isChecked: boolean;
}

const ToogleTable = (props: ToggleTableI) => {
  const { setIsChecked, isChecked } = props;

  return (
      <label className="text-slate-400">
        <input
          onClick={() => setIsChecked()}
          checked={isChecked}
          type="checkbox"
          className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
        />
        <span className="peer-checked:border-blue-500 peer-checked:shadow-blue-500/10 peer-checked:text-blue-500 peer-checked:before:border-blue-500 peer-checked:before:bg-blue-500 peer-checked:before:opacity-100 peer-checked:before:scale-100 peer-checked:before:content-['✓'] flex flex-col items-center justify-center w-28 min-h-[7rem] rounded-lg shadow-lg transition-all duration-200 cursor-pointer relative border-slate-300 border-[3px] bg-white before:absolute before:block before:w-5 before:h-5 before:border-[3px]  before:rounded-full before:top-1 before:left-1 before:opacity-0 before:transition-transform before:scale-0 before:text-white before:text-xs before:items-center before:justify-center hover:border-blue-500 hover:before:scale-100 hover:before:opacity-100">
          <span className="transition-all duration-100">
            <MaterialSymbolsTable className="text-4xl" />
          </span>
          <span className="transition-all duration-300 text-center">Tabla</span>
        </span>
      </label>
  );
};
export default ToogleTable;
