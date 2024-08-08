import { doc, updateDoc } from "firebase/firestore";
import { UpdateParticipantType } from "../domain/types/stickersTypes";
import db from "../firebase/firestore";

export const useUpdateParticipant = async ({
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
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return false;
  }
};
