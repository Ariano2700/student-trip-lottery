import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firestore";
import { ParticipantDataTypes } from "../domain/types/participantDataTypes";

const setNumbers = async (props: ParticipantDataTypes) => {
  try {
    const { lottery_number, createdAt,participant_name, phone_number } = props;
    await addDoc(collection(db, "participant_data"), {
      lottery_number,
      createdAt,
      participant_name,
      phone_number,
    });
    // console.log("Tarea guardada con id: ", docRef.id);
  } catch (error) {
    console.error("Error al guardar el numero: ", error);
    console.error(error);
    throw new Error("Error al guardar el numero");
  }
};
export default setNumbers;
