import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { stickersTypes } from "../domain/types/stickersTypes";

const useGetNumbers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "stickersNumbers"));
    const stickers_number: stickersTypes[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id || "No ID";
      if ("stickers_number" in data) {
        stickers_number.push({id, ...data } as stickersTypes);
      }
    });
    console.log(stickers_number);
    return stickers_number;
  } catch (error: any) {
    console.error("Error al obtener las tareas", error);
  }
};
export default useGetNumbers;
