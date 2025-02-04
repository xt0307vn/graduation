"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { APIAuthProfile, APIUser } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { useSelector } from "react-redux";
import AccountSidebar from "@/Components/Profile/Sidebar";
import Select from "@/Components/Common/Select";
import Datepicker from "@/Components/Common/Datepicker";

export default function AccountPage({}) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [gender, setGender] = useState(0)
    const genderValue = [
        {
            id: 1,
            name: "Nam"
        },
        {
            id: 2,
            name: "Nữ"
        },
        {
            id: 0,
            name: "Khác"
        }
    ]
    
    const { data: dataAccount, isLoading: isLoadingAccount, isSuccess: isSuccessAccount } = useQuery({
        queryKey: [APIAuthProfile],
        queryFn: () => request({
            url: `${APIAuthProfile}`,
            method: "GET"
        })
    })
    const handleSubmit = () => {
        console.log({
            date
        })
    }
    useEffect(() => {
        if (dataAccount) {
            setName(dataAccount?.data?.data?.name)
            setGender(dataAccount?.data?.data?.gender)
            const dob = dataAccount?.data?.data?.dob
            if(dob) {
                setDate(`${dob.split(/-|T/)[2]}/${dob.split(/-|T/)[1]}/${dob.split(/-|T/)[0]}`)
            }
        }
    }, [isSuccessAccount]);
    
    return(
        <div className="screen grid grid-cols-4 gap-4 my-5">
            <AccountSidebar />
            <div className="col-start-2 col-end-5">
                <div>
                    <h1 className="font-medium text-xlarge mt-5">Thông tin cá nhân</h1>
                    <div className="bg-white p-4 shadow-md rounded-md">
                        <div className="flex mb-5">
                            <div className="flex-1 border-r-gray-400 border-solid border-r-[0.0625rem] pr-4">
                                <div className="flex flex-col mb-3">
                                    <label className="font-medium text-medium mb-1">Họ và tên</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-current border-[0.0625rem] border-solid rounded-md px-3 py-2" />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <Datepicker value={date} onSetValue={setDate} name="Ngày sinh" />
                                </div>
                                <div className="flex flex-col">
                                    <Select name="Giới tính" placeholder="Giới tính" data={genderValue} onSelectValue={setGender} valueSelect={gender} size={'large'}/>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-5 pl-4">
                                <div className="flex justify-between text-medium">
                                    <h3 className="font-medium">Email</h3>
                                    <div className="flex gap-2 items-center text-primary">
                                        <span>Cập nhật</span>
                                        <FontAwesomeIcon className="text-small" icon={faChevronRight} />
                                    </div>
                                </div>
                                <div className="flex justify-between text-medium">
                                    <h3 className="font-medium">Mật khẩu</h3>
                                    <div className="flex gap-2 items-center text-primary">
                                        <span>Cập nhật</span>
                                        <FontAwesomeIcon className="text-small" icon={faChevronRight} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-3 bg-primary text-white font-bold rounded-md" onClick={handleSubmit}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}