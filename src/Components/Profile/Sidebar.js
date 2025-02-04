import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTableColumns, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import { useCookies } from "react-cookie";
import { useAppContext } from "@/Helpers/AppContext/AppProvider";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIAuthLogin, APIAuthProfile } from "@/Utils/Axios/APIs";
import Link from "next/link";

export default function AccountSidebar() {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['uat']);
    const {token, setToken, account, setAccount} = useAppContext()
    const queryClient = useQueryClient()
    
    const handleLogout = () => {
        CustomSwal.fire({
            title: 'Bạn chắc chắn đăng xuất?',
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                removeCookie('uat')
                setAccount({})
                setToken('')
                queryClient.removeQueries([APIAuthLogin])
                CustomSwal.fire({
                    title: "Đăng xuất thành công",
                    icon: "success",
                    timer: 2000
                })
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            }
        })
    }
    useEffect(() => {
    }, [account, token]);
    return (
        <div className="col-start-1 col-end-2">
            <div className=" rounded-md shadow-md pb-4">
                <div className="flex gap-4 p-4">
                    <div className="w-10 h-10 bg-primary rounded-full shrink-0 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold">{ account?.name}</h2>
                    </div>
                </div>
                <div className="bg-gray-400 h-[0.125rem] mb-4"></div>
                <div className="">
                    <Link href={'/profile'}>
                        <div className="flex items-center gap-2 text-large px-4 py-3 bg-primary-200 font-medium text-primary">
                            <FontAwesomeIcon icon={faCircleUser} className="shrink-0 w-5" />
                            <h4>Thông tin cá nhân</h4>
                        </div>
                    </Link> {
                    account?.role_id == 1 && (
                        <Link href={'/admin'}>
                            <div className="flex items-center gap-2 text-large px-4 py-3 font-medium text-black">
                            <FontAwesomeIcon icon={faTableColumns} className="shrink-0 w-5" />
                                    <h4>Trang quản lý</h4>
                                </div>
                            </Link>
                        )
                    }
                    <div className="flex items-center gap-2 text-large px-4 py-3 font-medium text-black cursor-pointer" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="shrink-0 w-5" />
                        <h4>Đăng xuất</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}