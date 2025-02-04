import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import CustomSwal from "@/Utils/Swal/CustomSwal";

export default function useUpate({url, queryKeys=[], setMessage}, options) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id,data}) => request({
            url: `${url}/${id}`,
            method: "PUT",
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }),
        onSuccess: (data) => {
            if(data?.status == 400) {
                setMessage(data?.response?.data?.message)
                CustomSwal.fire({
                    title: 'Cập nhật thất bại',
                    icon: "error",
                })
            }
            if(data?.data.status == 200 ) {
                setMessage([])
                CustomSwal.fire({
                    title: 'Cập nhật thành công',
                    icon: "success"
                })
                queryClient.removeQueries(queryKeys);
                queryClient.invalidateQueries(queryKeys)
            }
        },
        onError: (error) => {
            console.log(error)
        },
        ...options
    });
}
