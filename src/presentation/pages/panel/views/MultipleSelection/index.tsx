import { useState, useEffect } from "react";
import getNumbers from "../../../../../utils/getNumbers";
import setNumbers from "../../../../../utils/setNumber";

type ParticipantDataTypes = {
  lottery_number: number;
  participant_name: string;
  phone_number: string;
  createdAt: string;
};

const MultipleSelection = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [lotteryNumber, setLotteryNumber] = useState<ParticipantDataTypes[]>(
    []
  );
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const numbers: number[] = Array.from({ length: 300 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numbersLottery = await getNumbers(); // Reemplaza con tu función real
        if (numbersLottery !== undefined) {
          setLotteryNumber(numbersLottery);
        }
      } catch (error) {
        console.error("Error al obtener los números:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedNumbers([]);
    setName("");
    setPhoneNumber("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const isNumberInLotteryNumbers = (number: number): boolean => {
    return lotteryNumber.some(
      (lotteryNumber) => lotteryNumber.lottery_number === number
    );
  };

  const handleOnClick = (number: number) => {
    if (!isNumberInLotteryNumbers(number)) {
      setSelectedNumbers((prev) =>
        prev.includes(number)
          ? prev.filter((n) => n !== number)
          : [...prev, number]
      );
    }
  };

  const handleConfirm = async () => {
    if (name && phoneNumber && selectedNumbers.length > 0) {
      try {
        const newEntries = selectedNumbers.map((number) => ({
          lottery_number: number,
          participant_name: name,
          phone_number: phoneNumber,
          createdAt: new Date().toISOString(),
        }));

        // Subir uno por uno
        for (const entry of newEntries) {
          await setNumbers(entry); // Reemplaza con tu lógica de API
          setLotteryNumber((prev) => [...prev, entry]);
        }

        alert("Los números han sido registrados con éxito.");
        handleClose(); // Resetear todo después de confirmar
      } catch (error) {
        console.error("Error al establecer los números:", error);
      }
    } else {
      alert("Por favor, completa el nombre, número y selecciona los tickets.");
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
            {numbers.map((_, index) =>
              index % 4 === 0 ? (
                <tr className="h-[50px]" key={index}>
                  {numbers.slice(index, index + 4).map((num) => (
                    <td
                      key={num}
                      className={`border border-secondary p-5 ${
                        isNumberInLotteryNumbers(num)
                          ? "bg-yellow-600"
                          : selectedNumbers.includes(num)
                          ? "bg-blue-500 text-white"
                          : "cursor-pointer text-white"
                      }`}
                      onClick={() => handleOnClick(num)}
                    >
                      {num}
                    </td>
                  ))}
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={() => setOpenDialog(true)}
        disabled={selectedNumbers.length === 0}
      >
        Confirmar selección
      </button>
      {openDialog && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-black relative z-10">
            <h2 className="text-xl font-bold mb-4">Confirmar número</h2>
            <div className="mb-4">
              <p className="mb-2">
                Por favor ingresar los datos del participante con los numeros{" "}
                <span className="font-bold">{selectedNumbers.join(", ")}</span>:
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
              <p className="text-xs">Teléfono</p>
              <input
                type="text"
                placeholder="Ingrese el teléfono del participante"
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

export default MultipleSelection;
