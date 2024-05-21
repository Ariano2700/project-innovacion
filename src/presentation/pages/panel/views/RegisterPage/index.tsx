import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Auth,
  ErrorType,
  handleChangeSelect,
  handleChangeType,
  handleSubmitType,
} from "../../../../../domain/types/formTypes";
import { useAuth } from "../../../../../context/authContext";
import isEmailValid from "../../../../../hooks/isEmailValid";
import { SavedAlert } from "../../../../components/alerts/SavedAlert";
import { setRole } from "../../../../../hooks/setRole";
import OutsideForms from "../../../outsite/components/OutsideForms";
import InputForm from "../../../outsite/components/InputForm";
import SolarLockOutline from "../../../../components/icons/solar/SolarLockOutline";
import SolarUserOutline from "../../../../components/icons/solar/SolarUserOutline";
import { ErrorAlert } from "../../../../components/alerts/ErrorAlert";

const Register = () => {
  const { singUp, logOut, role } = useAuth();
  const navigate = useNavigate();
  if (role !== 1) {
    setTimeout(() => {
      navigate("/panel/inicio");
    }, 100);
  }
  const [user, setUser] = useState<Auth>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorType>(null);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("0");

  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    setError(null);
  };
  const handleChangeOption: handleChangeSelect = ({ target: { value } }) => {
    setSelectedRole(value);
    setError(null);
  };
  const handleSubmit: handleSubmitType = async (e) => {
    console.log("Rol seleccionado:", selectedRole);
    e.preventDefault();
    if (selectedRole !== "1" && selectedRole !== "2" && selectedRole !== "3") {
      setError("El rol seleccionado no es válido");
      setShowErrorDialog(true);
      return;
    }
    if (!isEmailValid(user.email)) {
      setError("El correo debe contener @ y un .com, .pe, etc");
      setShowErrorDialog(true);
      return;
    }
    // if (!isPasswordValid(user.password)) {
    //   setError(
    //     "La contraseña debe tener al menos 6 caracteres y al menos una letra mayúscula, una minúscula y un número"
    //   );
    //   setShowErrorDialog(true);
    //   return;
    // }
    try {
      const result = await singUp({
        email: user.email,
        password: user.password,
      });

      if (result !== null) {
        const selectedRoleInt = parseInt(selectedRole);
        const uid = String(result);
        console.log(uid);
        setTimeout(async () => {
          SavedAlert({ title: "Nuevo usuario registrado correctamente" });
          await setRole({ role: selectedRoleInt, uId: uid as string });
          navigate("/");
          logOut();
        }, 2000);
      }
    } catch (error: any) {
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError(
          "La contraseña debe tener 6 o mas caracteres" || "Error desconocido"
        );
        setShowErrorDialog(true);
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("El correo ya esta en uso" || "Error desconocido");
        setShowErrorDialog(true);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="mb-8">
          <h1 className="text-[#3a3838] dark:text-gray-300">
            Al registrar un nuevo usuario se cerrara la sesion actual para
            evitar conflictos.
          </h1>
        </div>
        <OutsideForms>
          {showErrorDialog && ErrorAlert({ error })}

          <form
            className="flex flex-col items-center gap-6 p-3 w-full"
            onSubmit={handleSubmit}
          >
            <h1 className=" font-semibold text-lg md:text-3xl text-[#323232]">
              Registrarse
            </h1>
            <InputForm
              placeholder="Email"
              type="email"
              name="email"
              icon={<SolarUserOutline />}
              onChange={handleChange}
              styleProp="inputLoginRegister"
            />
            <InputForm
              placeholder="Password"
              type="password"
              name="password"
              icon={<SolarLockOutline />}
              onChange={handleChange}
              styleProp="inputLoginRegister"
            />
            <div className="w-full relative">
              <select
                className="w-full inputLoginRegister transition ease-in-out duration-300"
                name="rolSelected"
                value={selectedRole}
                onChange={handleChangeOption}
              >
                <option value="0" disabled selected>
                  Seleccionar un rol
                </option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
                <option value="3">Visializador</option>
              </select>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button className="formBtn" type="submit">
                Registrar
              </button>
            </div>
          </form>
        </OutsideForms>
        <div className="w-full mt-8 grid place-content-center">
          <Link to={"/panel/inicio"}>
            <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out text-white">
              <span>Regresar</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
