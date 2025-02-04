import { useEffect, useState } from "react";
import { ParticipantDataTypes } from "../../../../domain/types/participantDataTypes";
import getNumbers from "../../../../utils/getNumbers";

function Home() {
  const [lotteryNumber, setLotteryNumber] = useState<ParticipantDataTypes[]>(
    []
  );
  const numbers: number[] = [];

  for (let i = 1; i <= 500; i++) {
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
        console.error("Error al obtener los recordatorios de tareas:", error);
      }
    };
    fetchData();
  }, []);

  const isNumberInLotteryNumbers = (number: number): boolean => {
    return lotteryNumber.some(
      (lotteryNumber) => lotteryNumber.lottery_number === number
    );
  };
  const availableNumbers = numbers.filter(
    (number) => !isNumberInLotteryNumbers(number)
  );
  return (
    <div className="flex flex-col items-center justify-center p-5 dialog drawer bg-[#181A1E] text-white z-10">
      <div className="p-5 mb-5">
        <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold">
          Rifa pro estudios - Fabian Yacila Gomez
        </h1>
      </div>
      <div className="flex gap-4 flex-col justify-center items-center mb-7">
        <p className="text-2xl flex gap-2">
          Quedan <span className="font-bold">{availableNumbers.length}</span>
          rifas disponibles
        </p>
        <p className="text-2xl flex gap-2">
          Hay <span className="font-bold">{500 - availableNumbers.length}</span>
          tickets ocupados
        </p>
        <p className="text-2xl flex gap-2 font-semibold">
          Los números de ticket que hay disponibles son los siguientes:
        </p>
      </div>
      <div className="w-[40%] flex items-center justify-center">
        <table className="table-auto w-full text-center text-xl">
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
                          className="border border-secondary p-5 text-white"
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
      <div className="logoStyles absolute inset-0 -z-10 opacity-10"></div>
    </div>
  );
}
export default Home;
