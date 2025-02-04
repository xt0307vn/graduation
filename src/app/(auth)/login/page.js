"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIAuthLogin, APIUserCreate, APIUserLogin } from "@/Utils/Axios/APIs";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useAppContext } from "@/Helpers/AppContext/AppProvider";

export default function LoginPage() {
    
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState([])
    const router = useRouter()
    const {token, setToken} = useAppContext()
    const [cookies, setCookie, removeCookie] = useCookies(['uat'], {
        doNotParse: true,
    });
    const {account, setAccount} = useAppContext()
    
    const {mutate, isError, isSuccess} = useMutation({
        mutationFn: (data) => request({
            url: APIAuthLogin,
            method: "POST",
            data,
        }),
        onError: (error) => {
            console.log({
                onError: true,
                error
            })
        },
        onSuccess: (data) => {
            if (data?.status == 400) {
                setMessage(data?.response?.data?.message)
            }
            if (data?.status == 200) {
                setCookie('uat', data.data.data.access_token)
                const {access_token, ...rest} = data.data.data
                setAccount({
                    ...rest
                })
                setToken(data.data.data.access_token)
                CustomSwal.fire({
                    title: 'Đăng nhập thành công',
                    icon: "success",
                    timer: 2000
                })
                setTimeout(() => {
                    router.push('/home')
                }, 2000)
            }
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        mutate({
            phone_number: phoneNumber,
            password,
        })
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="rounded-md shadow-lg p-5 max-w-full w-[22rem] sm:w-[22rem] md:w-[25rem] lg:[28rem] 2xl:w-[30rem]">
                <div className="flex justify-between mb-5 items-center">
                    <h1 className="text-2xlarge font-bold">Đăng nhập</h1>
                    <Link href='home'>
                        <div className="bg-primary rounded-full w-[2rem] h-[2rem] text-white flex justify-center items-center">
                            <FontAwesomeIcon icon={faHouse} />
                        </div>
                    </Link>
                </div>
                <form action="login" method="POST" className="">
                    <div className="flex flex-col text-medium mb-5">
                        <label className="mb-1 font-bold">Số điện thoại</label>
                        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="text" placeholder="Nhập số điện thoại" className="text-large rounded-md border-[0.0625rem] focus:border-primary border-gray-500 border-solid px-4 py-2" />
                        <p className="text-red-600 text-xsmall mt-1">{message && message?.find(item => item.property == "phone_number")?.message}</p>
                    </div>
                    <div className="flex flex-col text-medium mb-5">
                        <label className="mb-1 font-bold">Mật khẩu</label>
                        <div className="relative flex">
                            <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu" className="flex-1 text-large rounded-md border-[0.0625rem] focus:border-primary border-gray-500 border-solid px-4 py-2" />
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="cursor-pointer absolute top-1/2 translate-y-[-50%] right-0 p-2 select-none" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <p className="text-red-600 text-xsmall mt-1">{message && message?.find(item => item.property == "password")?.message}</p>
                    </div>
                    <div className="">
                        <button type="submit" onClick={handleSubmit} className="text-large w-full bg-primary py-2 rounded-md text-white">Đăng nhập</button>
                    </div>
                    <div className="">
                        <p className="text-center p-1">
                            <Link href='sign-up' className="text-small text-center hover:text-primary">Đăng ký</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}