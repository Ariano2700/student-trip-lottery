import { doc, updateDoc } from "firebase/firestore";
import { UpdateParticipantType } from "../domain/types/participantDataTypes";
import db from "../firebase/firestore";

export const updateParticipant = async ({
  id,
  participant_name,
}: UpdateParticipantType): Promise<boolean> => {
  try {
    const dofRef = doc(db, `lotteryNumbers/${id}`);
    if (participant_name) {
      await updateDoc(dofRef, {
        participant_name,
      });
    }
    console.log("Participant name updated successfully");

    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};
