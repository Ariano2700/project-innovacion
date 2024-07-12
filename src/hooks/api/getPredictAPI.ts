interface getPredictI {
  typeYear: number;
  typeData: number;
}

export interface getPredictResponse {
  prediction: number;
}

const getPredictAPI = async ({ typeData, typeYear }: getPredictI) => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const requestEgress = await fetch(`${baseURL}predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo_dato: typeData,
        tipo_anio: typeYear,
      }),
    });
    if (!requestEgress.ok) {
      throw new Error("Error fetching data");
    }
    const reponseEgress: getPredictResponse = await requestEgress.json();
    return reponseEgress;
  } catch (error: any) {
    throw new Error(error);
  }
};
export default getPredictAPI;
