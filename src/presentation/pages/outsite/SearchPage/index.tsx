import { useState } from "react";
import { handleChangeType } from "../../../../domain/types/formTypes";
import { MaterialSymbolsSearch } from "../../../components/icons/material-symbols/MaterialSymbolsSearch";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [uidTicket, setUidTicket] = useState<string>("");
  const navigate = useNavigate();
  const handleChange: handleChangeType = (e) => {
    setUidTicket(e.target.value);
  };

  const handleSearchTicket = () => {
    if (uidTicket.trim() !== "") {
      navigate(`/ticket/${uidTicket}`); // Redirige a la ruta dinámica
    } else {
      alert("Por favor, ingrese un código o número de ticket válido.");
    }
  };
  return (
    <main className="drawer bg-[#181A1E] text-white z-10 flex flex-col items-center justify-center p-5 dialog min-h-screen">
      <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold text-center mb-3">
        Rifa pro estudios - Fabian Yacila Gomez
      </h1>
      <h2 className="text-2xl flex gap-2 mb-3">¡Busque su ticket aca!</h2>
      <div className="mb-4 flex items-center gap-6 w-72">
        <input
          type="text"
          placeholder="Codigo o número de ticket"
          value={uidTicket}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
        <button
          onClick={handleSearchTicket}
          onDragEnter={handleSearchTicket}
          className="rounded-full p-2 text-3xl bg-white hover:bg-gray-300 text-[#181A1E] transition-all duration-300 ease-in-out"
        >
          <MaterialSymbolsSearch />
        </button>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="">
          <p className="text-xl text-center">Estudiante finalista de</p>
          <p className="text-xl text-center">
            Frank Arnott - Next Generation Explorers Award (NGEA™)
          </p>
        </div>
        <img src="/Fabian.jpg" alt="Fabian imagen" className="rounded-xl" />
      </div>
      <div className="logoStyles absolute inset-0 -z-10 opacity-10"></div>
    </main>
  );
}
export default SearchPage;
