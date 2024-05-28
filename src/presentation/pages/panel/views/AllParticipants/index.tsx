import { useEffect, useState } from "react";
import useGetNumbers from "../../../../../hooks/useGetNumbers";
import { lotteryTypes } from "../../../../../domain/types/lotteryTypes";
import { RiArrowDownSLine } from "../../../../components/icons/remix-icon/RiArrowDownSLine";

const AllParicipants = () => {
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
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center max-sm:text-2xl text-4xl text-white font-bold">
        <h1>Nombres y numeros de los participantes</h1>
      </div>
      <div className="p-8">
        {lotteryNumbers &&
          lotteryNumbers.map((lotteryNumber) => (
            <div className="flex items-center gap-5">
              <div className="p-2 flex items-center gap-5">
                <span className="text-xl bg-yellow-700 p-3 rounded-md">{lotteryNumber.lottery_number}</span>
                <RiArrowDownSLine className="rotate-[270deg] text-xl" />
              </div>
              <div className="p-2">
                <span className="text-xl">
                  {lotteryNumber.participant_name}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AllParicipants;
