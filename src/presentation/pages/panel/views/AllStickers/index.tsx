import { useEffect, useState } from "react";

import { RiArrowDownSLine } from "../../../../components/icons/remix-icon/RiArrowDownSLine";
import ButtonExcel from "../../components/ButtonExcel";
import { ZondiconsDotsHorizontalTriple } from "../../../../components/icons/zond-icons/ZondiconsDotsHorizontalTriple";
import { useDeleteParticipant } from "../../../../../hooks/useDeleteParticipant";
import { ConfirmAlert } from "../../../../components/alerts/ConfirmAlert";
import Swal from "sweetalert2";
import { ParticipantDataTypes } from "../../../../../domain/types/participantDataTypes";
import getNumbers from "../../../../../utils/getNumbers";
import { updateParticipant } from "../../../../../utils/updateParticipant";

const AllParicipants = () => {
  const [selectedParticipant, setSelectedParticipant] =
    useState<ParticipantDataTypes | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [lotteryNumber, setLotteryNumber] = useState<ParticipantDataTypes[]>(
    []
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleEditParticipant = (participant: ParticipantDataTypes) => {
    setSelectedParticipant(participant);
    setEditedName(participant.participant_name || "");
    setEditedPhoneNumber(participant.phone_number || "");
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    if (selectedParticipant && selectedParticipant.id) {
      const updatedData = {
        id: selectedParticipant.id, // ID del participante
        participant_name: editedName, // Nombre editado
        lottery_number: selectedParticipant.lottery_number, // Número de rifa (sin cambios en este caso)
        phone_number: editedPhoneNumber, // Teléfono editado
      };

      try {
        const isUpdated = await updateParticipant(updatedData);

        if (isUpdated) {
          Swal.fire({
            title: "¡Datos actualizados!",
            text: "Los datos del participante han sido actualizados correctamente.",
            icon: "success",
          });

          // Actualizar el estado local para reflejar los cambios
          setLotteryNumber((prev) =>
            prev.map((participant) =>
              participant.id === selectedParticipant.id
                ? {
                    ...participant,
                    participant_name: editedName,
                    phone: editedPhoneNumber,
                  }
                : participant
            )
          );

          handleClose(); // Cerrar el modal
        } else {
          throw new Error("No se pudo actualizar el participante.");
        }
      } catch (error) {
        console.error("Error al actualizar los datos del participante:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar los datos.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await getNumbers();
        if (numbersLottery !== undefined) {
          setLotteryNumber(numbersLottery);
        }
      } catch (error) {
        console.error("Error al obtener los recordatorios de tareas:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedParticipant(null);
  };

  const sortedStickersNumbers = [...lotteryNumber].sort((a, b) => {
    const dataA = a.lottery_number;
    const dataB = b.lottery_number;
    return dataA - dataB;
  });

  const { deleteParticipant } = useDeleteParticipant();

  const handleCopyCode = async (dataToCopy: string) => {
    try {
      await navigator.clipboard.writeText(dataToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };

  const handleDelete = async (idLotteryParticipant: ParticipantDataTypes) => {
    try {
      ConfirmAlert(
        async () => {
          await deleteParticipant(idLotteryParticipant.id || "");
          Swal.fire({
            title: "¡Borrado!",
            text: "El numero de rifa y su participante se ha eliminado.",
            icon: "success",
          });
          window.location.reload();
        },
        {
          confirmButtonText: "Si, eliminar la rifa",
          text: "Se eliminara el numero de rifa y su participante seleccionado",
          title: "¿Deseas eliminar esta rifa?",
        }
      );
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center max-sm:text-2xl text-4xl text-secondary font-bold">
        <h1>Números de rifa ocupados</h1>
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
                  N° RIFA
                </span>
                <RiArrowDownSLine className="rotate-[270deg] text-xl" />
              </div>
              <div className="p-2 flex items-center gap-3">
                <span className="text-xl text-secondary">
                  {stickersNumber.lottery_number} -{" "}
                  {stickersNumber.participant_name}
                </span>
                <details className="dropdown dropdown-end">
                  <summary className="flex items-center">
                    <ZondiconsDotsHorizontalTriple className="text-2xl cursor-pointer" />
                  </summary>
                  <ul className="p-2 shadow-md menu dropdown-content z-[1] bg-secondary rounded-box w-52 flex gap-2">
                    <li className="">
                      <button
                        onClick={() => handleEditParticipant(stickersNumber)}
                        className="btn btn-outline btn-primary text-secondary justify-start"
                      >
                        Editar datos del participante
                      </button>
                    </li>
                    <li className="">
                      <button
                        onClick={() => handleDelete(stickersNumber)}
                        className="btn btn-outline btn-primary text-secondary justify-start"
                      >
                        Borrar rifa y participante
                      </button>
                    </li>
                    <li className="">
                      <button
                        onClick={() => handleCopyCode(stickersNumber.id || "")}
                        className="btn btn-outline btn-primary text-secondary justify-center"
                      >
                        {!isCopied
                          ? "Copiar codigo de ticket"
                          : "¡Codido copiado!"}
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
              Editar datos del participante
            </h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar los nuevos datos del participante con el
                número{" "}
                <span className="font-bold">
                  {selectedParticipant?.lottery_number}
                </span>
                :
              </p>
              <p className="text-xs">Nombre</p>
              <input
                type="text"
                placeholder="Ingrese el nombre del participante"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <p className="text-xs">Telefono</p>
              <input
                type="text"
                placeholder="Ingrese el telefono del participante"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary mr-2" onClick={handleClose}>
                Cancelar
              </button>
              <button className="btn btn-warning" onClick={handleConfirm}>
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
