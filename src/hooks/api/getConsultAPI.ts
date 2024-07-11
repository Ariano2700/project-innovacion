import { getDataI } from "../../domain/types/getDataI";

interface ConsultResponse {
  reponseIn: getDataI[];
  reponseOut: getDataI[];
}

const getConsultAPI = async (): Promise<ConsultResponse> => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const requestIn = await fetch(`${baseURL}consult?id_tipo=1&id_anio=2`);
    const requestOut = await fetch(`${baseURL}consult?id_tipo=2&id_anio=2`);

    if (!requestIn.ok || !requestOut.ok) {
      throw new Error("Error fetching data");
    }

    const reponseIn: getDataI[] = await requestIn.json();
    const reponseOut: getDataI[] = await requestOut.json();

    return { reponseIn, reponseOut };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getConsultAPI;
