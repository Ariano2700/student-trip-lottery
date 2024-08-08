import { useEffect, useState } from "react";
import useGetNumbers from "../../../../../hooks/useGetNumbers";
import {
  stickersTypes,
} from "../../../../../domain/types/stickersTypes";
import { RiArrowDownSLine } from "../../../../components/icons/remix-icon/RiArrowDownSLine";
import ButtonExcel from "../../components/ButtonExcel";
import { ZondiconsDotsHorizontalTriple } from "../../../../components/icons/zond-icons/ZondiconsDotsHorizontalTriple";
import { useDeleteParticipant } from "../../../../../hooks/useDeleteParticipant";
import { ConfirmAlert } from "../../../../components/alerts/ConfirmAlert";
import Swal from "sweetalert2";

const AllParicipants = () => {
  const [stickersNumbers, setStickersNumbers] = useState<stickersTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await useGetNumbers();
        console.log(numbersLottery);
        if (numbersLottery !== undefined) {
          setStickersNumbers(numbersLottery);
        }
      } catch (error) {
        console.error("Error al obtener los recordatorios de tareas:", error);
      }
    };
    fetchData();
  }, []);

  const sortedStickersNumbers = [...stickersNumbers].sort((a, b) => {
    const dataA = a.stickers_number;
    const dataB = b.stickers_number;
    return dataA - dataB;
  });

  const { deleteParticipant } = useDeleteParticipant();

  const handleDelete = async (idLotteryParticipant: stickersTypes) => {
    try {
      ConfirmAlert(
        async () => {
          await deleteParticipant(idLotteryParticipant.id || "");
          Swal.fire({
            title: "¡Borrado!",
            text: "El sticker se ha eliminado.",
            icon: "success",
          });
          window.location.reload();
        },
        {
          confirmButtonText: "Si, eliminar sticker",
          text: "Se eliminara el sticker seleccionado",
          title: "¿Deseas eliminar este sticker?",
        }
      );
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center max-sm:text-2xl text-4xl text-secondary font-bold">
        <h1>Numero de los sticker encontrados</h1>
      </div>
      <div className="w-[100%] flex justify-end mt-4">
        <ButtonExcel lotteryData={sortedStickersNumbers} />
      </div>
      <div className="p-8 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {sortedStickersNumbers &&
          sortedStickersNumbers.map((stickersNumber) => (
            <div key={stickersNumber.id} className="flex items-center gap-5">
              <div className="p-2 flex items-center gap-5">
                <span className="text-xl bg-secondary text-primary p-3 rounded-md">
                  N° Sticker
                </span>
                <RiArrowDownSLine className="rotate-[270deg] text-xl" />
              </div>
              <div className="p-2 flex items-center gap-3">
                <span className="text-xl text-secondary">
                  {stickersNumber.stickers_number}
                </span>
                <details className="dropdown dropdown-end">
                  <summary className="flex items-center">
                    <ZondiconsDotsHorizontalTriple className="text-2xl cursor-pointer" />
                  </summary>
                  <ul className="p-2 shadow-md menu dropdown-content z-[1] bg-secondary rounded-box w-52 flex gap-2">
                    <li className="">
                      <button
                        onClick={() => handleDelete(stickersNumber)}
                        className="btn btn-outline btn-primary text-secondary justify-start"
                      >
                        Borrar sticker
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AllParicipants;
