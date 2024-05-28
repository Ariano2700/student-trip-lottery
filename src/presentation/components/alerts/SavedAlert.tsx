import Swal from "sweetalert2";
type SavedAlertType = {
  title: string;
};
export function SavedAlert(props: SavedAlertType) {
  const { title } = props;
  Swal.fire({
    position: "center",
    icon: "success",
    title: `${title}`,
    showConfirmButton: false,
    timer: 1500,
  });
}
