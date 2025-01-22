import { useEffect, useState } from "react";
import setNumbers from "../../../../../utils/setNumber";
import { ParticipantDataTypes } from "../../../../../domain/types/participantDataTypes";
import getNumbers from "../../../../../utils/getNumbers";
import { handleChangeType } from "../../../../../domain/types/formTypes";

const MissingLoterryNumbers = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [lotteryNumber, setLotteryNumber] = useState<ParticipantDataTypes[]>(
    []
  );
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const numbers: number[] = [];

  const NumOfStickers = 300;

  for (let i = 1; i <= NumOfStickers; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await getNumbers();
        if (numbersLottery !== undefined) {
          setLotteryNumber(numbersLottery);
        }
      } catch (error) {
        console.error("Error al obtener los números de la rifa:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange: handleChangeType = (e) => {
    setName(e.target.value);
  };
  const handleChangePhoneNumber: handleChangeType = (e) => {
    setPhoneNumber(e.target.value);
  };
  const isNumberInLotteryNumbers = (number: number): boolean => {
    return lotteryNumber.some(
      (lotteryNumber) => lotteryNumber.lottery_number === number
    );
  };

  const handleOnClick = (number: number) => {
    if (!isNumberInLotteryNumbers(number)) {
      setSelectedNumber(number);
      setOpenDialog(true);
    }
  };

  const handleConfirm = async () => {
    if (selectedNumber !== null) {
      try {
        const result = async () => {
          await setNumbers({
            lottery_number: selectedNumber,
            participant_name: name,
            phone_number: phoneNumber,
            createdAt: new Date().toISOString(),
          });
          setLotteryNumber([
            ...lotteryNumber,
            {
              lottery_number: selectedNumber,
              createdAt: new Date().toISOString(),
              phone_number: phoneNumber,
              participant_name: name,
            },
          ]);
          setOpenDialog(false);
        };
        result();
        setPhoneNumber("")
        setName("")
      } catch (error) {
        console.error("Error al establecer el número:", error);
      }
    }
  };
  const availableNumbers = numbers.filter(
    (number) => !isNumberInLotteryNumbers(number)
  );

  return (
    <div className="flex flex-col items-center justify-center p-5 dialog">
      {availableNumbers && availableNumbers.length === 0 ? (
        <div className="text-center text-2xl text-red-500">
          No hay números disponibles
        </div>
      ) : (
        <>
          <div className="p-5 mb-5">
            <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold">
              Rifa pro estudios - Fabian Yacila Gomez
            </h1>
          </div>
          <div className="w-[40%] flex flex-col gap-10 items-center justify-center">
            <div className="flex gap-4 flex-col justify-center items-center">
              <p className="text-2xl flex gap-2">
                Quedan{" "}
                <span className="font-bold">{availableNumbers.length}</span>
                rifas disponibles
              </p>
              <p className="text-2xl flex gap-2">
                Hay{" "}
                <span className="font-bold">
                  {NumOfStickers - availableNumbers.length}
                </span>
                tickets ocupados
              </p>
            </div>
            <table className="table-auto w-full text-center">
              <tbody>
                {availableNumbers.map((_, index) =>
                  index % 4 === 0 ? (
                    <tr className="h-[50px]" key={index}>
                      {[0, 1, 2, 3].map((offset) => {
                        const currentNumber = availableNumbers[index + offset];
                        return (
                          currentNumber !== undefined && (
                            <td
                              key={index + offset}
                              className="border border-secondary p-5 cursor-pointer text-white"
                              onClick={() => handleOnClick(currentNumber)}
                            >
                              {currentNumber}
                            </td>
                          )
                        );
                      })}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {openDialog && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-black relative z-10">
            <h2 className="text-xl font-bold mb-4">Confirmar número</h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar el nombre del participante con el número{" "}
                {selectedNumber}:
              </p>
              <p className="text-xs">Nombre</p>
              <input
                type="text"
                placeholder="Ingrese el nombre del participante"
                value={name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <p className="text-xs">Telefono</p>
              <input
                type="text"
                placeholder="Ingrese el telefono del participante"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
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

export default MissingLoterryNumbers;
