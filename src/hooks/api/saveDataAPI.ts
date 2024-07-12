interface saveDataI {
  typeYear: number;
  typeData: number;
  mes: string;
  total: number;
}

const saveDataAPI = async ({ typeData, typeYear, mes, total }: saveDataI) => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const request = await fetch(`${baseURL}save-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_tipo: typeData,
        id_anio: typeYear,
        mes: mes,
        total: total,
      }),
    });
    if (request.status === 409) {
      return request.status;
    }
    if (!request.ok) {
      throw new Error("Error saving data");
    }
    const reponseEgress = await request.json();
    return reponseEgress;
  } catch (error: any) {
    throw new Error(error);
  }
};
export default saveDataAPI;
