import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getParticipantData from "../../../../utils/getParticipantData";
import { ParticipantDataTypes } from "../../../../domain/types/participantDataTypes";
import formatDate from "../../../../utils/formatDate";
import FaSpinner from "../../../components/icons/font-awesome/FaSpinner";
import { RiArrowDownSLine } from "../../../components/icons/remix-icon/RiArrowDownSLine";
import { MaterialSymbolsSearch } from "../../../components/icons/material-symbols/MaterialSymbolsSearch";

const TicketPage = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [participantData, setParticipantData] =
    useState<ParticipantDataTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uidTicket, setUidTicket] = useState<string>("");
  const formatTicketNumber = (number: number): string => {
    return `N°${number.toString().padStart(5, "0")}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchTicket = () => {
    if (uidTicket.trim() !== "") {
      navigate(`/ticket/${uidTicket}`); // Redirige a la ruta dinámica
    } else {
      alert("Por favor, ingrese un código o número de ticket válido.");
    }
  };

  useEffect(() => {
    const searchData = async (param: string) => {
      try {
        setLoading(true);
        const participant = await getParticipantData(param);

        if (participant) {
          setParticipantData(participant);
        } else {
          setError(
            "No se encontró ningún participante con el parámetro proporcionado."
          );
        }
      } catch (err) {
        setError("Error al buscar participante.");
        console.log(error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      searchData(uid);
    }
  }, [uid, error]);

  return (
    <main className="drawer bg-[#181A1E] text-white z-10 flex flex-col items-center justify-center p-5 dialog min-h-screen">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <button
          onClick={handleBack}
          className="flex items-center text-xl bg-white hover:bg-gray-300 text-[#181A1E] transition-all duration-300 ease-in-out rounded-3xl px-5 py-3"
        >
          <RiArrowDownSLine className="text-2xl rotate-90" />
          Atras
        </button>
        <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold text-center mb-3">
          Rifa pro estudios - Fabian Yacila Gomez
        </h1>
      </div>

      {/* Sección 2: Formulario (Blanco) */}
      <section
        id="buscar"
        className="flex flex-col items-center justify-center p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
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
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
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
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin">
            {" "}
            <FaSpinner className="text-2xl" />{" "}
          </div>
        </div>
      ) : participantData ? (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-5">
            <img
              src="/flyer_rifa.png"
              alt="Fabian imagen"
              className="w-4/6 max-w-[600px] min-w-[300px] rounded-xl shadow-lg"
            />
          </div>
          <div className="max-w-2xl mx-auto p-4">
            {/* Main ticket container */}
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              {/* Top section */}
              <div className="bg-red-500 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="border border-dashed border-gray-400 p-2 bg-white">
                    <img
                      src="/canada_bandera.png"
                      alt="Bandera de canada"
                      className="size-16"
                    />{" "}
                  </div>
                  <div className="border border-dashed border-gray-400 p-2 bg-white text-black">
                    <p className="text-lg flex items-center gap-2">
                      Valor de
                      <span className="font-bold text-xl">S/.5</span>
                    </p>
                  </div>
                </div>

                <h1 className="text-center text-3xl md:text-4xl font-bold text-white">
                  BOLETO DE RIFA PRO VIAJE DE ESTUDIOS A CANADÁ
                </h1>

                <p className="text-center text-xl md:text-2xl font-semibold text-white">
                  {formatTicketNumber(participantData.lottery_number)}
                </p>

                <div className="text-center text-sm md:text-base text-white space-y-2">
                  <p className="font-semibold text-xl">
                    GRAN RIFA - FEBRERO 15/2025
                  </p>
                  <p>UNI FINALISTA</p>
                  <p>Frank Arnott - Next Generation Explorers Award (NGEA™)</p>
                  <p className="font-bold text-lg">PREMIOS</p>
                  <div className="grid grid-cols-2 text-lg">
                    <p>
                      Premio 1: <span className="font-bold">S/.250</span>
                    </p>
                    <p>
                      Premio 2: <span className="font-bold">S/.150</span>
                    </p>
                    <p>
                      Premio 3: <span className="font-bold">S/.50</span>
                    </p>
                    <p>
                      Premio 4: <span className="font-bold">S/.50</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dotted separator */}
              <div className="border-t-2 border-dashed border-gray-400 my-2"></div>

              {/* Bottom section */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-dashed border-gray-400 p-2 gap-5">
                      <img
                        src="/canada_bandera.png"
                        alt="Bandera de canada"
                        className="size-16"
                      />{" "}
                      <p className="text-black">
                        Fecha de compra:{" "}
                        <span className="font-bold">
                          {formatDate(participantData.createdAt)}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="font-semibold text-black">NOMBRE:</p>
                        <div className="flex items-center border-b-2 border-gray-300 py-1">
                          <span className="text-black text-xl">
                            {participantData?.participant_name ||
                              "_______________________________"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between text-black">
                    <div className="text-center space-y-2">
                      <h2 className="text-xl font-bold">BOLETO DE RIFA</h2>
                      <p className="text-xl md:text-2xl text-red-600 font-semibold">
                        {formatTicketNumber(participantData.lottery_number)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-red-500">Número o código de ticket no encontrado.</p>
      )}
    </main>
  );
};

export default TicketPage;
