import { useState } from "react";
import * as XLSX from "xlsx";
import { VscodeIconsFileTypeExcel } from "../../../components/icons/vscode-icons/VscodeIconsFileTypeExcel";
import { BxLoaderCircle } from "../../../components/icons/boxIcons/BxLoaderCircle";
import { ParticipantDataTypes } from "../../../../domain/types/participantDataTypes";
import formatDate from "../../../../utils/formatDate";

const ButtonExcel = ({
  lotteryData,
}: {
  lotteryData: ParticipantDataTypes[];
}) => {
  const [loading, setLoading] = useState(false);
  const getCurrentDateFormatted = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const currentDate = getCurrentDateFormatted();

  const tittle = [{ A: "Conteo de números de rifa" }, {}];

  const lengths = [15, 35];

  const handleDownload = () => {
    setLoading(true);

    const table = [
      {
        A: "Nº DE TICKET",
        B: "NOMBRE DEL PARTICIPANTE",
        C: "NUMERO DE CELULAR",
        D: "FECHA DE COMPRA",
      },
    ];

    lotteryData.forEach((lotteryData: ParticipantDataTypes) => {
      table.push({
        A: lotteryData.lottery_number.toString(),
        B: lotteryData.participant_name,
        C: lotteryData.phone_number,
        D: formatDate(lotteryData.createdAt),
      });
    });

    const dataFinal = [...tittle, ...table];

    setTimeout(() => {
      generate_file(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const generate_file = (dataFinal: any[]) => {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    sheet["!merges"] = [
      XLSX.utils.decode_range("A1:B1"),
      XLSX.utils.decode_range("A2:B2"),
    ];
    const properties: { width: number }[] = [];

    lengths.forEach((col) => {
      properties.push({
        width: col,
      });
    });

    sheet["!cols"] = properties;

    XLSX.utils.book_append_sheet(book, sheet, "Números de tickets de rifa");
    XLSX.writeFile(book, `Conteo de rifa | ${currentDate}.xlsx`);
  };
  return (
    <>
      {!loading ? (
        <button
          className="bg-[#01904E] p-4 flex gap-3 items-center rounded-lg hover:bg-[#295f46] transition-all duration-300"
          onClick={handleDownload}
        >
          <VscodeIconsFileTypeExcel className="text-xl" /> Descargar
        </button>
      ) : (
        <button
          className="bg-[#01904E] p-4 flex gap-3 items-center rounded-lg"
          disabled
        >
          <BxLoaderCircle className="animate-spin" />
          <span>Generando...</span>
        </button>
      )}
    </>
  );
};

export default ButtonExcel;
