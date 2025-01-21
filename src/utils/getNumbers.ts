import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { ParticipantDataTypes } from "../domain/types/participantDataTypes";

const getNumbers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "participant_data"));
    const lottery_number: ParticipantDataTypes[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id || "No ID";
      if ("lottery_number" in data) {
        lottery_number.push({id, ...data } as ParticipantDataTypes);
      }
    });
    console.log(lottery_number);
    return lottery_number;
  } catch (error) {
    console.error("Error al obtener las tareas", error);
  }
};
export default getNumbers;
