import { useEffect, useState } from "react";
import { lotteryTypes } from "../../../../../domain/types/lotteryTypes";
import useGetNumbers from "../../../../../hooks/useGetNumbers";
import useSetNumbers from "../../../../../hooks/useSetNumber";

const MissingLoterryNumbers = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [lotteryNumbers, setLotteryNumbers] = useState<lotteryTypes[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const numbers: number[] = [];

  for (let i = 401; i <= 450; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await useGetNumbers();
        if (numbersLottery !== undefined) {
          setLotteryNumbers(numbersLottery);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isNumberInLotteryNumbers = (number: number): boolean => {
    return lotteryNumbers.some(
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
    if (selectedNumber !== null && name) {
      try {
        await useSetNumbers({
          lottery_number: selectedNumber,
          participant_name: name,
        });
        setLotteryNumbers([
          ...lotteryNumbers,
          { lottery_number: selectedNumber, participant_name: name },
        ]);
        setName("");
        setOpenDialog(false);
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
      <div className="p-5 mb-5">
        <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold">
          Números de Rifa Disponibles 401 - 450
        </h1>
      </div>
      <div className="w-[40%] flex items-center justify-center">
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
      {openDialog && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-black relative z-10">
            <h2 className="text-xl font-bold mb-4">Ingresar el nombre</h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar el nombre del participante del número{" "}
                {selectedNumber}:
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
