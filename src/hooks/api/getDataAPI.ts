import { getDataI } from "../../domain/types/getDataI";

const getDataAPI = async ():Promise<getDataI[]> => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const requestEgress = await fetch(`${baseURL}data?id_tipo=2`);
    if (!requestEgress.ok) {
      throw new Error("Error fetching data");
    }
    const reponseEgress: getDataI[] = await requestEgress.json();
    return reponseEgress;
  } catch (error: any) {
    throw new Error(error);
  }
};
export default getDataAPI;
