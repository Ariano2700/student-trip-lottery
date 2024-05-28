import { addDoc, collection } from "firebase/firestore";
import { lotteryTypes } from "../domain/types/lotteryTypes";
import db from "../firebase/firestore";

const useSetNumbers = async (props: lotteryTypes) => {
  try {
    const { lottery_number, participant_name } = props;
    await addDoc(collection(db, "lotteryNumbers"), {
      lottery_number,
      participant_name
    });
    // console.log("Tarea guardada con id: ", docRef.id);
  } catch (error) {
    console.error("Error al guardar el numero: ", error);
    console.error(error);
    throw new Error("Error al guardar el numero");
  }
};
export default useSetNumbers;
