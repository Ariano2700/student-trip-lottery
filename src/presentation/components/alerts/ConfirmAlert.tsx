import Swal from "sweetalert2";

type ConfirmAlertProps = {
  title: string
  text: string
  confirmButtonText: string
}
export function ConfirmAlert(callback: () => void, props: ConfirmAlertProps) {
  const {confirmButtonText, text, title} = props
  Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `${confirmButtonText}`,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}
