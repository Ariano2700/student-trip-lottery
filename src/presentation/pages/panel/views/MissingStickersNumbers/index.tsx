import { useEffect, useState } from "react";
import { stickersTypes } from "../../../../../domain/types/stickersTypes";
import useGetNumbers from "../../../../../hooks/useGetNumbers";
import useSetNumbers from "../../../../../hooks/useSetNumber";

const MissingLoterryNumbers = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [stickersNumbers, setStickersNumbers] = useState<stickersTypes[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const numbers: number[] = [];

  const NumOfStickers = 332;

  for (let i = 1; i <= NumOfStickers; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await useGetNumbers();
        if (numbersLottery !== undefined) {
          setStickersNumbers(numbersLottery);
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

  const isNumberInLotteryNumbers = (number: number): boolean => {
    return stickersNumbers.some(
      (stickersNumbers) => stickersNumbers.stickers_number === number
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
        await useSetNumbers({
          stickers_number: selectedNumber,
        });
        setStickersNumbers([
          ...stickersNumbers,
          { stickers_number: selectedNumber },
        ]);
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
      {availableNumbers && availableNumbers.length === 0 ? (
        <div className="text-center text-2xl text-red-500">
          No hay números disponibles
        </div>
      ) : (
        <>
          <div className="p-5 mb-5">
            <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold">
              Álbum de stickers Universitario 2024
            </h1>
          </div>
          <div className="w-[40%] flex flex-col gap-10 items-center justify-center">
            <div className="flex gap-4 flex-col justify-center items-center">
              <p className="text-2xl flex gap-2">
                Quedan <span className="font-bold">{availableNumbers.length}</span>
                stickers por encontrar
              </p>
              <p className="text-2xl flex gap-2">
                Tienes <span className="font-bold">{NumOfStickers - availableNumbers.length}</span>
                stickers
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
                Por favor confirmar el número de sticker del album{" "}
                {selectedNumber}:
              </p>
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
