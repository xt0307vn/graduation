import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import CustomSwal from "@/Utils/Swal/CustomSwal";

export default function useDelete({url, queryKeys=[]}, options) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => request({
            url: `${url}/${id}`,
            method: "DELETE",
        }),
        onSuccess: (data) => {
            if(data?.data.status == 200) {
                CustomSwal.fire({
                    title: 'Xoá dữ liệu thành công',
                    icon: "success"
                })
                queryClient.removeQueries(queryKeys);
                queryClient.invalidateQueries(queryKeys)
            }
        },
        onError: (error) => {
            CustomSwal.fire({
                title: 'Cập nhật thất bại',
                icon: "error",
                text: error
            })
        },
        ...options
    })
}
