import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firestore";
import { stickersTypes } from "../domain/types/stickersTypes";

const useSetNumbers = async (props: stickersTypes) => {
  try {
    const { stickers_number } = props;
    await addDoc(collection(db, "stickersNumbers"), {
      stickers_number
     });
    // console.log("Tarea guardada con id: ", docRef.id);
  } catch (error) {
    console.error("Error al guardar el numero: ", error);
    console.error(error);
    throw new Error("Error al guardar el numero");
  }
};
export default useSetNumbers;
