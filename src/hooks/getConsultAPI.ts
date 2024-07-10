const getConsultAPI = async () => {
  const baseURL = import.meta.env.VITE_API_URL;
  try {
    const requestIn = await fetch(`${baseURL}consult?id_tipo=1&id_anio=2`);
    const requestOut = await fetch(`${baseURL}consult?id_tipo=2&id_anio=2`);

    if (!requestIn.ok && !requestOut.ok) {
      throw new Error("Error fetching data");
    }

    const reponseIn = await requestIn.json();
    const reponseOut = await requestOut.json();

    return { reponseIn, reponseOut };
  } catch (error: any) {
    throw new Error(error);
  }
};
export default getConsultAPI;
