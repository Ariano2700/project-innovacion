import { useEffect, useState } from "react";
import GraphicsChartJs from "../../../components/graphics/GraphicsTest";
import { motion } from "framer-motion";
import getConsultAPI from "../../../../hooks/api/getConsultAPI";
import { getDataI } from "../../../../domain/types/getDataI";

interface BeneficioInt {
  ingreso: string | undefined;
  egreso: string | undefined;
}

export function capitalizarPrimeraLetra(str: string | undefined) {
  if (str === undefined) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function beneficioNeto(props: BeneficioInt) {
  const { egreso, ingreso } = props;
  if (ingreso !== undefined && egreso !== undefined) {
    const parseIngreso = parseInt(ingreso);
    const parseEgreso = parseInt(egreso);
    const beneficioTotal = (parseIngreso - parseEgreso).toString();
    const benficioFormated = formatDataMoney(beneficioTotal)
    return (benficioFormated);
  }
  return;
}

export function formatDataMoney(number: string | undefined) {
  if (number === undefined) return;
  const parseNumber = parseInt(number);

  if (parseNumber >= 1000 && parseNumber < 10000) {
    return number.substring(0, 1) + "," + number.substring(1);
  } else if (parseNumber >= 10000) {
    return number.substring(0, 2) + "," + number.substring(2);
  } else {
    return number;
  }
}
interface ComponentDashBoard{
  title: string;
  year: string;
}
const ComponentDashBoard = ({title, year}:ComponentDashBoard) => {
  const [income, setIncome] = useState<getDataI>();
  const [egress, setEgress] = useState<getDataI>();
  const [dataGraphics, setDataGraphics] = useState<number[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { reponseIn, reponseOut } = await getConsultAPI();
        
        const dataInArray:number[] = []
        reponseOut.forEach(data => {
          const dataTotal = parseInt(data.total)
          dataInArray.push(dataTotal);
          })
          setDataGraphics(dataInArray);
        
        setIncome(reponseIn.at(-1));
        setEgress(reponseOut.at(-1));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(dataGraphics)
  return (
    <div className="w-full overflow-hidden">
      <div className="flex-grow lg:p-6">
        <motion.header
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Dashboard
          </h1>
        </motion.header>

        <div className="">
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
            <h1 className="text-3xl text-black dark:text-white">
              {capitalizarPrimeraLetra(income?.mes)}
            </h1>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 xl lg:grid-cols-3 gap-6 p-4 ">
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
            className="p-6 bg-white rounded-3xl shadow-lg flex flex-row min-w-60 dark:bg-[#202528]"
          >
            <div className=" w-1/2">
              <h2 className="text-xl font-bold mb-4">Ingresos totales</h2>
              <p className="text-3xl font-semibold text-green-500">
                S/
                {formatDataMoney(income?.total)}
              </p>
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
            className="p-6 bg-white rounded-3xl  shadow-lg flex flex-row min-w-60 dark:bg-[#202528]"
          >
            <div className="w-1/2">
              <h2 className="text-xl font-bold mb-4">Gastos </h2>
              <p className="text-3xl font-semibold text-red-500">
                S/{formatDataMoney(egress?.total)}
              </p>
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
            className="p-6 bg-white rounded-3xl  shadow-lg flex flex-row min-w-60 dark:bg-[#202528] "
          >
            <div className=" w-1/2">
              <h2 className="text-xl font-bold mb-4">Beneficio Neto</h2>
              <p className="text-3xl font-semibold text-blue-500">
                S/
                {beneficioNeto({
                  egreso: egress?.total,
                  ingreso: income?.total,
                })}
              </p>
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
            <h1 className="mt-4 ml-4 text-2xl font-bold">Graficas {title}</h1>
            <div className="flex flex-col w-full p-8">
              <GraphicsChartJs title={title} year={year}  dataE={dataGraphics}  />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: "easeIn",
            }}
            className="lg:col-span-3 grid grid-cols-1  w-full gap-4  "
          >
            <div className="max-lg:col-span-1 lg:col-span-2 h-96 dark:text-black bg-white flex flex-col dark:bg-[#202528]  items-center shadow-xl p-8 rounded-3xl overflow-y-auto">
              <div className="flex flex-col w-full h-full p-4 space-y-4">
                <div className="flex items-start">
                  <img
                    src="/chatgptlogo.png"
                    alt="chatgpt"
                    width={32}
                    height={32}
                    className="rounded-full mr-2 bg-transparent"
                  />
                  <div className="bg-gray-200 rounded-lg p-2">
                    <p className="text-sm">
                      ¡Hola! Soy ChatGPT. ¿En qué puedo ayudarte hoy?
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img
                    src="/chatgptlogo.png"
                    alt="chatgpt"
                    width={32}
                    height={32}
                    className="rounded-full mr-2 bg-transparent"
                  />
                  <div className="bg-gray-200 rounded-lg p-2">
                    <p className="text-sm">¿Cómo puedo ayudarte hoy?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" max-h-32 flex items-center justify-center bg-white rounded-3xl dark:text-black dark:bg-[#202528]">
              <form className="p-6 rounded-md w-full bg-blue-50  dark:text-black dark:bg-[#202528]">
                <div className="flex items-center rounded-md border">
                  <input
                    className="flex-grow p-2 border-none border focus:border-gray-100 focus:ring-0 focus:outline-none  dark:text-white dark:bg-[#202528]"
                    placeholder="Enter your prompt..."
                    type="text"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDashBoard;
