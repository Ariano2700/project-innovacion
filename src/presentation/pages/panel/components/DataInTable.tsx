import { getDataI } from "../../../../domain/types/getDataI";
import { years } from "../../../../hooks/DiccionarioXD";
// import { years } from "../../../../hooks/DiccionarioXD";
import { capitalizeFirstLetter } from "../../../../hooks/formatHook/capitalizeFirstLetter";
import { formatDataMoney } from "../../../../hooks/formatHook/formatDataMoney";

interface DataInTableProps {
  data: getDataI[];
}

const getYear = (id_anio: number) => {
  return years[id_anio] || id_anio;
};

// const getType = (id_tipo: number) => {
//   return typeofData[id_tipo] || id_tipo;
// };
const DataInTable = (props: DataInTableProps) => {
  const { data } = props;
  return (
    <div className="flex justify-center">
      <table className="w-3/4">
        <thead className="bg-primary text-white font-bold">
          <tr>
            <th className="py-2 px-4">Año</th>
            <th className="py-2 px-4">Mes</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2">{getYear(data.id_anio)}</td>
              <td className="px-4 py-2">{capitalizeFirstLetter(data.mes)}</td>
              <td className="px-4 py-2">S/{formatDataMoney(data.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DataInTable;
