import Swal from "sweetalert2";

const CustomSwal = Swal.mixin({
    cancelButtonText: "Huỷ",
    confirmButtonText: "Đồng ý",
    customClass: {
        title: 'text-large pt-1',
        icon: 'mt-5',
        text: 'text-medium pt-1',
        actions: 'mt-3',
        htmlContainer: 'pt-1',
        cancelButton: 'bg-red-600 py-1 px-2',
        confirmButton: 'bg-primary py-1 px-2'
    },
});

export default CustomSwal