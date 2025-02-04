"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCapsules,
    faCirclePlus,
    faDisease,
    faNewspaper,
    faPenToSquare, faTrash,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIDiseaseCount, APIMedicineCount, APIPost, APIPostCount, APIUser, APIUserCount } from "@/Utils/Axios/APIs";
import Link from "next/link";
import { Tooltip } from "@mui/material";

export default function AdminPage() {
    
    const [countMedicine, setCountMedicine] = useState(0)
    const [countDisease, setCountDisease] = useState(0)
    const [countPost, setCountPost] = useState(0)
    const [countUser, setCountUser] = useState(0)
    const [user, setUser] = useState({})
    
    const {data: dataUser, isLoading, isSuccess: isSuccessUser} = useQuery({
        queryKey: ["AdminUserDashboard"],
        queryFn: () => request({
            url: APIUser,
            method: "GET",
            params: {
                limit: 5,
            }
        }),
    })
    
    const {data: dataMedicineCount, isSuccess: isSuccessMedicineCount} = useQuery({
        queryKey: ['MedicineCount'],
        queryFn: () => request({
            method: "GET",
            url: APIMedicineCount
        })
    })
    
    const {data: dataUserCount, isSuccess: isSuccessUserCount} = useQuery({
        queryKey: ['UserCount'],
        queryFn: () => request({
            method: "GET",
            url: APIUserCount
        })
    })
    
    const {data: dataDiseaseCount, isSuccess: isSuccessDiseaseCount} = useQuery({
        queryKey: ['DiseaseCount'],
        queryFn: () => request({
            method: "GET",
            url: APIDiseaseCount
        })
    })
    
    const {data: dataPostCount, isSuccess: isSuccessPostCount} = useQuery({
        queryKey: ['PostCount'],
        queryFn: () => request({
            method: "GET",
            url: APIPostCount
        })
    })
    
    useEffect(() => {
        if(dataMedicineCount) {
            console.log(dataMedicineCount)
            setCountMedicine(dataMedicineCount?.data?.count)
        }
        if(dataDiseaseCount) {
            setCountDisease(dataDiseaseCount?.data?.count)
        }
        if(dataPostCount) {
            setCountPost(dataPostCount?.data?.count)
        }
        if(dataUserCount) {
            setCountUser(dataUserCount?.data?.count)
        }
        if(dataUser) {
            setUser(dataUser?.data?.data)
        }
    }, [isSuccessMedicineCount, isSuccessDiseaseCount, isSuccessPostCount, isSuccessUser])
    
    return (
        <div>
            <div className="mb-4 flex justify-between sticky top-0 bg-white rounded-md p-4 shadow z-50">
                <h1 className="text-large font-bold">Trang quản lý</h1>
            </div>
            <div className="grid grid-cols-5 gap-5 mb-5">
                <div className="bg-white p-4 rounded-lg aspect-square shadow-md relative flex flex-col">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faCapsules} />
                    </div>
                    <h6>Số thuốc</h6>
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-7xl text-center">{countMedicine}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg aspect-square shadow-md relative flex flex-col">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-fuchsia-800 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faDisease} />
                    </div>
                    <h6>Số bệnh lý</h6>
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-7xl text-center">{countDisease}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg aspect-square shadow-md relative flex flex-col">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <h6>Số bài viết</h6>
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-7xl text-center">{countPost}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg aspect-square shadow-md relative flex flex-col">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h6>Số bài viết</h6>
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-7xl text-center">{countUser}</p>
                    </div>
                </div>
            </div>
            <table className="border-collapse table-auto w-full text-sm t-table">
                <thead>
                    <tr className="pb-">
                        <th className="w-1/6 text-left">Tên</th>
                        <th className="text-left">Số điện thoại</th>
                        <th className="text-left">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (user?.data?.length != 0) && user?.data?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-left line-clamp-1">{item.name}</td>
                                    <td className="text-left ">{item.phone_number}</td>
                                    <td className="text-left ">{item.status == 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}