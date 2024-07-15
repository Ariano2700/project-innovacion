import { motion } from "framer-motion";
import { typeofData } from "../../../../../hooks/DiccionarioXD";
import { useState } from "react";
import PredictionLoader from "../../../../components/PredictionLoader";
import getPredictAPI, {
  getPredictResponse,
} from "../../../../../hooks/api/getPredictAPI";
import { formatDataMoney } from "../../../../../hooks/formatHook/formatDataMoney";
import BarGraphicChartJS from "../../../../components/graphics/BarGraphic";
import getDataByType from "../../../../../hooks/api/getDataByType";
import GraphicsChartJs from "../../../../components/graphics/GraphicsTest";
import ToggleGraphics from "../../components/toggle-graphics/ToggleGraphics";
const PredictionPage = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataPredict, setDataPredict] = useState<getPredictResponse | null>(
    null
  );
  const [dataLabels, setDataLabels] = useState<string[]>([]);
  const [dataGeneral, setDataGeneral] = useState<number[]>([]);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const hanldeToggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(parseInt(event.target.value, 10));
  };

  const handleSubmit = async () => {
    if (selectedType && selectedType > 0) {
      try {
        setLoading(true);
        const dataPredict = await getPredictAPI({
          typeData: selectedType,
        });
        setDataPredict(dataPredict);
        const responseData = await getDataByType({
          id_tipo: `${selectedType.toString()}`,
        });
        const dataGeneralArray: number[] = [];
        const dataLabelsArray: string[] = [];

        responseData.response.forEach((data) => {
          const dataTotal = parseInt(data.total);
          const dataMonth = data.mes;
          dataGeneralArray.push(dataTotal);
          dataLabelsArray.push(dataMonth);
        });
        dataGeneralArray.push(dataPredict.predictionOneMonth);
        dataGeneralArray.push(dataPredict.predictionTwoMonth);
        dataLabelsArray.push("Prediccion 1");
        dataLabelsArray.push("Prediccion 2");

        setDataGeneral(dataGeneralArray);
        setDataLabels(dataLabelsArray);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="mb-8 text-4xl font-bold text-black dark:text-white"
      >
        Predicciones financieras
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        Ingrese informacion para tener la prediccion de los siguentes dos meses
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className="flex gap-20">
          <div className="flex gap-5 items-center justify-center">
            <label className="mb-2">Tipo de dato:</label>
            <select
              value={selectedType || ""}
              onChange={handleTypeChange}
              className="text-black"
            >
              <option value="" disabled>
                Seleccione un tipo
              </option>
              {Object.entries(typeofData).map(([key, value]) => (
                <option className="text-black" key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex gap-5 items-center justify-center">
            <label className="mb-2">Año:</label>
            <select
              value={selectedYear || ""}
              onChange={handleYearChange}
              className="text-black"
            >
              <option value="" disabled>
                Seleccione un año
              </option>
              {Object.entries(years).map(([key, value]) => (
                <option className="text-black" key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div> */}

          <button
            onClick={handleSubmit}
            className="px-4 bg-primary hover:bg-secondary transition-all duration-300 rounded-lg"
          >
            Predecir
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="flex justify-center mt-14"
      >
        {loading ? (
          <PredictionLoader />
        ) : dataPredict === null ? (
          <p className="text-2xl">Esperando datos para la prediccion</p>
        ) : (
          <section className="w-full flex flex-col gap-10 justify-center items-center">
            <ToggleGraphics
              isChecked={isChecked}
              setIsChecked={hanldeToggleChecked}
            />
            <div className="">
              <p>
                Predicción par el primer mes siguiente:
                <span className="font-bold">
                  S/
                  {formatDataMoney(String(dataPredict.predictionOneMonth))}.00
                </span>
              </p>
              <p>
                Predicción par el segundo mes siguiente:
                <span className="font-bold">
                  S/
                  {formatDataMoney(String(dataPredict.predictionTwoMonth))}.00
                </span>
              </p>
            </div>
            <div className="w-[85%] flex justify-center items-center flex-col">
              {isChecked ? (
                <GraphicsChartJs
                  title={`Predicción de ${
                    selectedType === 1 ? "ingresos" : "egresos"
                  } de los siguientes dos meses del año`}
                  year="2024"
                  dataE={dataGeneral}
                  labels={dataLabels}
                />
              ) : (
                <BarGraphicChartJS
                  title={`Predicción de ${
                    selectedType === 1 ? "ingresos" : "egresos"
                  } de los siguientes dos meses del año `}
                  year={`2024`}
                  dataE={dataGeneral}
                  labels={dataLabels}
                />
              )}
            </div>
          </section>
        )}
      </motion.div>
    </section>
  );
};
export default PredictionPage;
