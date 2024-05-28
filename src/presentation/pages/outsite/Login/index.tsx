import { useNavigate } from "react-router-dom";
import {
  Auth,
  ErrorType,
  handleChangeType,
  handleSubmitType,
} from "../../../../domain/types/formTypes";
import { useAuth } from "../../../../context/authContext";
import { useState } from "react";
import InputForm from "../components/InputForm";
import SolarUserOutline from "../../../components/icons/solar/SolarUserOutline";
import SolarLockOutline from "../../../components/icons/solar/SolarLockOutline";
import { ErrorAlert } from "../../../components/alerts/ErrorAlert";
import OutsideForms from "../components/OutsideForms";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState<Auth>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorType>(null);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    setError(null);
  };

  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      await login({ email: user.email, password: user.password });
      navigate("/panel/inicio");
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setError(
          "El correo o la contraseña son incorrectos" || "Error desconocido"
        );
        setShowErrorDialog(true);
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError(
          "El correo es incorrecto, intentalo con otro" || "Error desconocido"
        );
        setShowErrorDialog(true);
      }
      if (error.message === "Firebase: Error (auth/missing-password).") {
        setError(
          "La contraseña es incorrecta, intentalo con otro" ||
            "Error desconocido"
        );
        setShowErrorDialog(true);
      }
    }
  };
  return (
      <div className="flex items-center justify-center">
        <OutsideForms>
        {showErrorDialog && ErrorAlert({ error })}
        <form
          className="flex flex-col items-center gap-6 p-3 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[#323232] font-semibold text-lg md:text-3xl">
            Iniciar sesión
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
          <div className="flex justify-center items-center gap-4 mt-6">
            <button className="formBtn" type="submit">
              Ingresar →
            </button>
          </div>
        </form>
        </OutsideForms>
      </div>
  );
};
export default Login