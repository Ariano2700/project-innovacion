import { motion } from "framer-motion";
import { typeofData, years } from "../../../../../hooks/DiccionarioXD";
import { useState } from "react";
import PredictionLoader from "../../../../components/PredictionLoader";
import getPredictAPI, {
  getPredictResponse,
} from "../../../../../hooks/api/getPredictAPI";
import { formatDataMoney } from "../../../../../hooks/formatHook/formatDataMoney";
const PredictionPage = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataPredict, setDataPredict] = useState<getPredictResponse | null>(
    null
  );

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleSubmit = async () => {
    if (selectedType && selectedYear && selectedType > 0 && selectedYear > 0) {
      try {
        setLoading(true);
        const dataPredict = await getPredictAPI({
          typeData: selectedType,
          typeYear: selectedYear,
        });
        console.log("antes del settimeout", dataPredict);
        setTimeout(() => {
          setDataPredict(dataPredict);
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
        Ingrese informacion para tener la prediccion del siguente mes
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

          <div className="flex gap-5 items-center justify-center">
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
          </div>

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
          <p>S/{formatDataMoney(dataPredict.prediction.toString())}.00</p>
        )}
      </motion.div>
    </section>
  );
};
export default PredictionPage;
