import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { lotteryTypes } from "../domain/types/lotteryTypes";

const useGetNumbers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "lotteryNumbers"));
    const lottery_numbers: lotteryTypes[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      //const id = doc.id || "No ID";
      if ("lottery_number" in data) {
        lottery_numbers.push({...data } as lotteryTypes);
      }
    });
    console.log(lottery_numbers);
    return lottery_numbers;
  } catch (error: any) {
    console.error("Error al obtener las tareas", error);
  }
};
export default useGetNumbers;
