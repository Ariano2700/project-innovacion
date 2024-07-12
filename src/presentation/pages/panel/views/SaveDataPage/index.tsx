import { motion } from "framer-motion";
import { useState } from "react";
import { months, typeofData, years } from "../../../../../hooks/DiccionarioXD";
import { capitalizeFirstLetter } from "../../../../../hooks/formatHook/capitalizeFirstLetter";
import InputForm from "../../../outsite/components/InputForm";
import MaterialSymbols123 from "../../../../components/icons/material-symbols/MaterialSymbols123";
import {
  ErrorType,
  handleChangeType,
} from "../../../../../domain/types/formTypes";
import saveDataAPI from "../../../../../hooks/api/saveDataAPI";
import { ConfirmAlert } from "../../../../components/alerts/ConfirmAlert";
import { SavedAlert } from "../../../../components/alerts/SavedAlert";
import { ErrorAlert } from "../../../../components/alerts/ErrorAlert";
const SaveDataPage = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(parseInt(event.target.value, 10));
    setShowErrorDialog(false);
    setError(null);
  };

  const handleChangeTotal: handleChangeType = ({ target: { value } }) => {
    setTotalAmount(parseInt(value));
    setShowErrorDialog(false);
    setError(null);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
    setShowErrorDialog(false);
    setError(null);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setShowErrorDialog(false);
    setError(null);
  };

  const handleSubmit = async () => {
    if (
      selectedMonth !== null &&
      selectedYear !== null &&
      selectedType !== null &&
      totalAmount > 0
    ) {
      try {
        ConfirmAlert(
          async () => {
            setLoading(true);
            const req = await saveDataAPI({
              typeYear: selectedYear,
              mes: selectedMonth,
              typeData: selectedType,
              total: totalAmount,
            });
            if (req === 409) {
              setError("El monto para ese tipo de dato, mes y año ya existen.");
              setShowErrorDialog(true);
              return
            }
            console.log(req);
            SavedAlert({ title: "Se guardaron correctamente los datos" });
          },
          {
            confirmButtonText: "Guardar datos",
            text: "Estos datos se podran modificar luego si es que hay una equivocación",
            title: "¿Estas seguro de guardar estos datos?",
          }
        );
      } catch (error: any) {
        setError(error.message);
        setShowErrorDialog(true);
        console.log(error);
      }
    } else {
      setError("Se deben colocar todos los datos para el guardado de estos");
      setShowErrorDialog(true);
    }
  };

  return (
    <section>
      {showErrorDialog && ErrorAlert({ error })}
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
        Guardado de datos
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
        Ingrese informacion correcta para el guardado de los datos
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
        <div className="flex flex-wrap gap-20 items-center justify-center">
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
            <label className="mb-2">Mes:</label>
            <select
              value={selectedMonth || ""}
              onChange={handleMonthChange}
              className="text-black"
            >
              <option value="" disabled>
                Seleccione un mes
              </option>
              {Object.entries(months).map(([key, value]) => (
                <option className="text-black" key={key} value={key}>
                  {capitalizeFirstLetter(value)}
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

          <div className="flex gap-5 items-center-justify-center">
            <label htmlFor="mb-2">Monto a ingresar:</label>
            <InputForm
              placeholder="Monto"
              type="text"
              name="amount"
              icon={<MaterialSymbols123 className="text-xl" />}
              onChange={handleChangeTotal}
              styleProp="h-10 rounded input input-bordered w-full bg-slate-100 dark:bg-[#202528] dark:text-white text-black dark:placeholder:text-white placeholder:text-black p-2 pr-10 border border-black dark:border-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 bg-primary hover:bg-secondary transition-all duration-300 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </section>
  );
};
export default SaveDataPage;
