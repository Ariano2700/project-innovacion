interface getPredictI {
  typeData: number;
}

export interface getPredictResponse {
  prediction: number;
}

const getPredictAPI = async ({ typeData }: getPredictI) => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const requestEgress = await fetch(`${baseURL}predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_tipo: typeData,
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
