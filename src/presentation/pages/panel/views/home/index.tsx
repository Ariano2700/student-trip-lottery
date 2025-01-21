import { useEffect, useState } from "react";
import { ParticipantDataTypes } from "../../../../../domain/types/participantDataTypes";
import getNumbers from "../../../../../utils/getNumbers";
import setNumbers from "../../../../../utils/setNumber";
import { handleChangeType } from "../../../../../domain/types/formTypes";

function Home() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [lotteryNumber, setLotteryNumber] = useState<ParticipantDataTypes[]>(
    []
  );
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const numbers: number[] = [];

  for (let i = 1; i <= 300; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await getNumbers();
        console.log(numbersLottery);
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
      } catch (error) {
        console.error("Error al establecer el número:", error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-5 dialog">
      <div className="p-5 mb-5">
        <h1 className="max-sm:text-2xl text-4xl text-secondary font-bold">
          Rifa pro estudios - Fabian Yacila Gomez
        </h1>
      </div>
      <div className="w-[40%] flex items-center justify-center">
        <table className="table-auto w-full text-center">
          <tbody>
            {numbers.map((number, index) =>
              index % 4 === 0 ? (
                <tr className="h-[50px]" key={index}>
                  <td
                    className={`border border-secondary p-5 ${
                      isNumberInLotteryNumbers(number)
                        ? "bg-yellow-600"
                        : "cursor-pointer text-white"
                    }`}
                    onClick={() => handleOnClick(number)}
                  >
                    {number}
                  </td>
                  <td
                    className={`border border-secondary p-5 ${
                      isNumberInLotteryNumbers(numbers[index + 1])
                        ? "bg-yellow-600"
                        : "cursor-pointer text-white"
                    }`}
                    onClick={() => handleOnClick(numbers[index + 1])}
                  >
                    {numbers[index + 1]}
                  </td>
                  <td
                    className={`border border-secondary p-5 ${
                      isNumberInLotteryNumbers(numbers[index + 2])
                        ? "bg-yellow-600"
                        : "cursor-pointer text-white"
                    }`}
                    onClick={() => handleOnClick(numbers[index + 2])}
                  >
                    {numbers[index + 2]}
                  </td>
                  <td
                    className={`border border-secondary p-5 ${
                      isNumberInLotteryNumbers(numbers[index + 3])
                        ? "bg-yellow-600"
                        : "cursor-pointer text-white"
                    }`}
                    onClick={() => handleOnClick(numbers[index + 3])}
                  >
                    {numbers[index + 3]}
                  </td>
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
            <h2 className="text-xl font-bold mb-4">Confirmar número</h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar el nombre del participante del número{" "}
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
              <p className="text-xs">Número</p>
              <input
                type="text"
                placeholder="Ingrese el número del participante"
                value={name}
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
}
export default Home;
