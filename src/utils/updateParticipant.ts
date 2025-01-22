import { doc, updateDoc } from "firebase/firestore";
import { UpdateParticipantType } from "../domain/types/participantDataTypes";
import db from "../firebase/firestore";

export const updateParticipant = async ({
  id,
  participant_name,
  lottery_number,
  phone_number,
}: UpdateParticipantType): Promise<boolean> => {
  try {
    const dofRef = doc(db, `participant_data/${id}`);
    if (participant_name) {
      await updateDoc(dofRef, {
        participant_name,
        lottery_number,
        phone_number,
      });
    }
    console.log("Participant name updated successfully");

    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};
