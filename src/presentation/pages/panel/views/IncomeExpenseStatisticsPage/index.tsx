import { motion } from "framer-motion";
import GraphicsChartJs from "../../../../components/graphics/GraphicsTest";
import { useEffect, useState } from "react";
import getConsultAPI from "../../../../../hooks/api/getConsultAPI";
import ToogleTable from "../../components/ToggleTable";
import DataInTable from "../../components/DataInTable";
import { getDataI } from "../../../../../domain/types/getDataI";
import getDataByType from "../../../../../hooks/api/getDataByType";

const IncomeExpenseStatistcsPage = () => {
  const [income, setIncome] = useState<number[]>([]);
  const [egress, setEgress] = useState<number[]>([]);
  const [incomeLabelsMonth, setIncomeLabelsMonth] = useState<string[]>([]);
  const [egressLabelsMonth, setEgressLabelsMonth] = useState<string[]>([]);
  const [incomeTable, setIncomeTable] = useState<getDataI[]>();
  const [egreseTable, setEgreseTable] = useState<getDataI[]>();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { reponseIn, reponseOut } = await getConsultAPI();
        const responseIn = await getDataByType({ id_tipo: "1" });
        const responseOut = await getDataByType({ id_tipo: "2" });

        console.log(responseIn);

        if (responseIn !== undefined && responseOut !== undefined) {
          const dataInArray: number[] = [];
          const dataOutArray: number[] = [];
          const dataInArrayMonths: string[] = [];
          const dataOutArrayMonths: string[] = [];
          responseOut.response.forEach((data) => {
            const dataTotal = parseInt(data.total);
            const dataMonth = data.mes;
            dataOutArray.push(dataTotal);
            dataOutArrayMonths.push(dataMonth);
          });
          responseIn.response.forEach((data) => {
            const dataTotal = parseInt(data.total);
            const dataMonth = data.mes;
            dataInArray.push(dataTotal);
            dataInArrayMonths.push(dataMonth);
          });
          setIncome(dataInArray);
          setEgress(dataOutArray);
          setIncomeLabelsMonth(dataInArrayMonths);
          setEgressLabelsMonth(dataOutArrayMonths);
          setIncomeTable(responseIn.response);
          setEgreseTable(responseOut.response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const hanldeToggleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="">
      <div className="flex flex-col justify-start">
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
          {" "}
          Estadisticas y tablas
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <ToogleTable
            isChecked={isChecked}
            setIsChecked={hanldeToggleChecked}
          />
        </motion.div>
      </div>

      {isChecked ? (
        <section className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeInOut",
              }}
              className="mb-8 text-2xl font-bold text-black dark:text-white"
            >
              Tabla de ingresos año 2023 - 2024
            </motion.h2>
            <DataInTable data={incomeTable !== undefined ? incomeTable : []} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeInOut",
              }}
              className="mb-8 text-2xl font-bold text-black dark:text-white"
            >
              Tabla de egresos año 2023 - 2024
            </motion.h2>
            <DataInTable data={egreseTable !== undefined ? egreseTable : []} />
          </motion.div>
        </section>
      ) : (
        <section className="flex items-center justify-center">
          <div className="flex flex-col gap-10 w-[50%]">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeInOut",
              }}
              className="bg-white dark:bg-[#202528] lg:col-span-3 rounded-3xl flex flex-col items-start shadow-xl"
            >
              <h1 className="mt-4 ml-4 text-2xl font-bold">
                Graficas ingresos
              </h1>
              <div className="flex flex-col w-full p-8">
                <GraphicsChartJs
                  title="ingresos"
                  year="2023"
                  dataE={income}
                  labels={incomeLabelsMonth}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeInOut",
              }}
              className="bg-white dark:bg-[#202528] lg:col-span-3 rounded-3xl flex flex-col items-start shadow-xl"
            >
              <h1 className="mt-4 ml-4 text-2xl font-bold">Graficas egresos</h1>
              <div className="flex flex-col w-full p-8">
                <GraphicsChartJs
                  title="egresos"
                  year="2023"
                  dataE={egress}
                  labels={egressLabelsMonth}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};
export default IncomeExpenseStatistcsPage;
