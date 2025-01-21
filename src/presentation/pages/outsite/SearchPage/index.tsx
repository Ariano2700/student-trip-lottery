import { useState } from "react";
import { MaterialSymbolsSearch } from "../../../components/icons/material-symbols/MaterialSymbolsSearch";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [uidTicket, setUidTicket] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchTicket = () => {
    if (uidTicket.trim() !== "") {
      navigate(`/ticket/${uidTicket}`); // Redirige a la ruta dinámica
    } else {
      alert("Por favor, ingrese un código o número de ticket válido.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col montserrat">
      {/* Barra de navegación */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Rifa Pro Estudios</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#buscar" className="hover:text-gray-300">
                Buscar Ticket
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                Acerca de
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sección 1: Imagen (Rojo) */}
      <section
        id="inicio"
        className="bg-red-600 flex-1 flex items-center justify-center p-8"
      >
        <img
          src="/flyer_rifa.png"
          alt="Fabian imagen"
          className="w-4/6 max-w-[600px] min-w-[300px] rounded-xl shadow-lg"
        />
      </section>

      {/* Sección 2: Formulario (Blanco) */}
      <section
        id="buscar"
        className="bg-white flex-1 flex flex-col items-center justify-center p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          ¡Busque su ticket aquí!
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchTicket();
          }}
          className="w-full max-w-md"
        >
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="Código o número de ticket"
              value={uidTicket}
              onChange={(e) => setUidTicket(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              required
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              <MaterialSymbolsSearch />
            </button>
          </div>
        </form>
      </section>

      {/* Sección 3: About (Rojo) */}
      <section
        id="about"
        className="bg-red-600 flex-1 flex flex-col items-center justify-center p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          Acerca de Fabian Yacila Gomez
        </h2>
        <p className="text-center max-w-2xl">
          Fabian es un estudiante dedicado que está recaudando fondos para
          continuar sus estudios. Tu apoyo en esta rifa no solo te da la
          oportunidad de ganar grandes premios, sino que también ayuda a Fabian
          a alcanzar sus metas educativas. ¡Gracias por tu participación!
        </p>
      </section>

      {/* Sección 4: About premio */}
      <section
        id="buscar"
        className="bg-white flex-1 flex flex-col items-center justify-center p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Frank Arnott - Next Generation Explorers Award (NGEA™)
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-center max-w-2xl">
            El Frank Arnott - Next Generation Explorers Award (NGEA™) es un
            prestigioso reconocimiento diseñado para inspirar, empoderar y
            destacar a la próxima generación de innovadores en el ámbito de la
            exploración geocientífica. Este galardón, creado en honor al
            visionario Frank Arnott, celebra el ingenio y la colaboración
            interdisciplinaria para resolver desafíos complejos en la industria
            minera y de recursos naturales. El NGEA™ busca fomentar un enfoque
            fresco e innovador en la integración, visualización y análisis de
            datos geocientíficos. A través de este concurso, equipos de jóvenes
            exploradores y profesionales emergentes tienen la oportunidad de
            demostrar su creatividad, habilidades técnicas y capacidad para
            aplicar soluciones de vanguardia que puedan transformar la
            exploración de recursos.
          </p>
          <img src="https://cdn7.pdac.ca/web/images/_720x670_crop_center-center_none/68154/FAA-image.webp" alt="icono de Frank Arnott" className="size-52 rounded-xl" />
        </div>
      </section>

      {/* Logo de fondo */}
      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="logoStyles w-full h-full"></div>
      </div>
    </div>
  );
}
export default SearchPage;
