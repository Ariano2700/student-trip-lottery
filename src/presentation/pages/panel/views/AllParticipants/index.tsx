import { useEffect, useState } from "react";
import useGetNumbers from "../../../../../hooks/useGetNumbers";
import {
  UpdateParticipantType,
  lotteryTypes,
} from "../../../../../domain/types/lotteryTypes";
import { RiArrowDownSLine } from "../../../../components/icons/remix-icon/RiArrowDownSLine";
import ButtonExcel from "../../components/ButtonExcel";
import { ZondiconsDotsHorizontalTriple } from "../../../../components/icons/zond-icons/ZondiconsDotsHorizontalTriple";
import { useDeleteParticipant } from "../../../../../hooks/useDeleteParticipant";
import { ConfirmAlert } from "../../../../components/alerts/ConfirmAlert";
import Swal from "sweetalert2";
import { handleChangeType } from "../../../../../domain/types/formTypes";
import { useUpdateParticipant } from "../../../../../hooks/useUpdateParticipant";

const AllParicipants = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [participantId, setParticipantId] = useState<string>("");
  const [lotteryNumbers, setLotteryNumbers] = useState<lotteryTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await useGetNumbers();
        console.log(numbersLottery);
        if (numbersLottery !== undefined) {
          setLotteryNumbers(numbersLottery);
        }
      } catch (error) {
        console.error("Error al obtener los recordatorios de tareas:", error);
      }
    };
    fetchData();
  }, []);

  const sortedLotteryNumbers = [...lotteryNumbers].sort((a, b) => {
    const dataA = a.lottery_number;
    const dataB = b.lottery_number;
    return dataA - dataB;
  });

  const { deleteParticipant } = useDeleteParticipant();

  const handleOpen = (idParticipant: string) => {
    setParticipantId(idParticipant);
    setOpenDialog(true);
  };

  const handleChange: handleChangeType = (e) => {
    setName(e.target.value);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async ({
    id,
    participant_name,
  }: UpdateParticipantType) => {
    if (id && participant_name) {
      try {
        const result = async () => {
          await useUpdateParticipant({
            id: id,
            participant_name: participant_name,
          });
          setOpenDialog(false);
          window.location.reload();
        };
        await result();
      } catch (error) {
        console.error("Error al establecer el número:", error);
      }
    }
  };

  const handleDelete = async (idLotteryParticipant: lotteryTypes) => {
    try {
      ConfirmAlert(
        async () => {
          await deleteParticipant(idLotteryParticipant.id || "");
          Swal.fire({
            title: "¡Borrado!",
            text: "La tarea se ha eliminado.",
            icon: "success",
          });
          window.location.reload();
        },
        {
          confirmButtonText: "Si, eliminar participante",
          text: "Se eliminara el participante seleccionado",
          title: "¿Deseas eliminar este participante?",
        }
      );
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center max-sm:text-2xl text-4xl text-secondary font-bold">
        <h1>Nombres y numeros de los participantes</h1>
      </div>
      <div className="w-[100%] flex justify-end mt-4">
        <ButtonExcel lotteryData={sortedLotteryNumbers} />
      </div>
      <div className="p-8 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {sortedLotteryNumbers &&
          sortedLotteryNumbers.map((lotteryNumber) => (
            <div key={lotteryNumber.id} className="flex items-center gap-5">
              <div className="p-2 flex items-center gap-5">
                <span className="text-xl bg-secondary text-primary p-3 rounded-md">
                  {lotteryNumber.lottery_number}
                </span>
                <RiArrowDownSLine className="rotate-[270deg] text-xl" />
              </div>
              <div className="p-2 flex items-center gap-3">
                <span className="text-xl text-secondary">
                  {lotteryNumber.participant_name?.toUpperCase()}
                </span>
                <details className="dropdown dropdown-end">
                  <summary className="flex items-center">
                    <ZondiconsDotsHorizontalTriple className="text-2xl cursor-pointer" />
                  </summary>
                  <ul className="p-2 shadow-md menu dropdown-content z-[1] bg-secondary rounded-box w-52 flex gap-2">
                    <li className="">
                      <button
                        onClick={() => handleOpen(lotteryNumber.id || "")}
                        className="btn justify-start bg-secondary"
                      >
                        <span className="text-primary">Editar</span>
                      </button>
                    </li>
                    <li className="">
                      <button
                        onClick={() => handleDelete(lotteryNumber)}
                        className="btn btn-outline btn-primary text-secondary justify-start"
                      >
                        Borrar participante
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          ))}
      </div>
      {openDialog && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-black relative z-10">
            <h2 className="text-xl font-bold mb-4">
              Editar el nombre del participante
            </h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar el nuevo nombre del participante
              </p>
              <input
                type="text"
                value={name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary mr-2" onClick={handleClose}>
                Cancelar
              </button>
              <button
                className="btn btn-warning"
                onClick={() =>
                  handleConfirm({ id: participantId, participant_name: name })
                }
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllParicipants;
