import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteParticipant = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteParticipant = async (idLotteryParticipant: string) => {
    try {
      setLoading(true);
      if (!idLotteryParticipant) {
        throw new Error("El uid es inválido");
      }
      const taskDocRef = doc(db, `participant_data/${idLotteryParticipant}`);
      await deleteDoc(taskDocRef);
      setSuccess(true);
    } catch (error) {
      setError("Error al eliminar al participante");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return { loading, error, success, deleteParticipant };
};
