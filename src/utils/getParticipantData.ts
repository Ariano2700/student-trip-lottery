import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../firebase/firestore";
import { ParticipantDataTypes } from "../domain/types/participantDataTypes";

/**
 * Busca un documento en la colección "participant_data" por UID o número de ticket.
 * @param {string} searchParam - UID del documento o número de ticket.
 * @returns {Promise<ParticipantDataTypes | null>} - El documento encontrado o null si no existe.
 */
const getParticipantData = async (
  searchParam: string
): Promise<ParticipantDataTypes | null> => {
  try {
    if (/^\d+$/.test(searchParam)) {
      // Es un número de ticket
      const ticketQuery = query(
        collection(db, "participant_data"),
        where("lottery_number", "==", parseInt(searchParam, 10))
      );
      const querySnapshot = await getDocs(ticketQuery);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        return { id: docData.id, ...docData.data() } as ParticipantDataTypes;
      }
    } else {
      // Es un UID
      const docRef = doc(db, "participant_data", searchParam);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        } as ParticipantDataTypes;
      }
    }

    return null; // No se encontró ningún documento
  } catch (error) {
    console.error("Error al buscar el participante:", error);
    throw error;
  }
};

export default getParticipantData;
