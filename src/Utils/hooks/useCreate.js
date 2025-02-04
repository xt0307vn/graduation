import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import { hanldleScrollTopAdmin } from "@/Utils/CustomFunction/FunctionsAdmin";

export default function useCreate({url, queryKeys=[], setMessage}, options) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => request({
            url: url,
            method: "POST",
            data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }),
        onSuccess: (data) => {
            if(data?.status == 400) {
                setMessage(data?.response?.data?.message)
                CustomSwal.fire({
                    title: 'Tạo mới thất bại',
                    icon: "error",
                })
            }
            if(data?.data.status == 200 ) {
                CustomSwal.fire({
                    title: 'Tạo mới thành công',
                    icon: "success",
                })
                setMessage([])
                queryClient.removeQueries(queryKeys);
                queryClient.invalidateQueries(queryKeys)
                hanldleScrollTopAdmin()
            }
        },
        onError: (error) => {
            console.log(error)
        },
        ...options
    });
}
