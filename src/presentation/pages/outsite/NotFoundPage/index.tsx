import { Link } from "react-router-dom";

const NotfoundPage = () => {
  return (
    <>
      <div className="flex flex-col text-4xl items-center gap-5 text-center">
        <h2 className="dark:text-gray-400 text-gray-500">404 - PAGE NOT FOUND</h2>
        <h1 className="dark:text-white text-black">
          LA PAGINA BUSCADA NO SE <br /> ENCUENTRA EN EL SITIO WEB.
        </h1>
        <Link to={"/panel/inicio"}>
            <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out text-white">
              <span>Regresar</span>
            </button>
          </Link>
      </div>
    </>
  );
}
export default NotfoundPage