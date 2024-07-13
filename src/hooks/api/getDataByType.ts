import { getDataI } from "../../domain/types/getDataI";

interface ConsultDataByTypeI {
  response: getDataI[];
}
const getDataByType = async ({
  id_tipo,
}: {
  id_tipo: string;
}): Promise<ConsultDataByTypeI> => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const request = await fetch(`${baseURL}data?id_tipo=${id_tipo}`);
    if (!request.ok) {
      throw new Error("Error fetching data");
    }
    const response: getDataI[] = await request.json();
    return { response };
  } catch (error: any) {
    throw new Error(error);
  }
};
export default getDataByType;
