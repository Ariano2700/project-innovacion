import { formatDataMoney } from "./formatDataMoney";

interface BeneficioInt {
  ingreso: string | undefined;
  egreso: string | undefined;
}

export function netBenefit(props: BeneficioInt) {
  const { egreso, ingreso } = props;
  if (ingreso !== undefined && egreso !== undefined) {
    const parseIngreso = parseFloat(ingreso);
    const parseEgreso = parseFloat(egreso);
    const beneficioTotal = (parseIngreso - parseEgreso).toString();
    const benficioFormated = formatDataMoney(beneficioTotal);
    console.log(typeof beneficioTotal);
    return benficioFormated;
  }
  return;
}
