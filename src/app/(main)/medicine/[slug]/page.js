"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { APIPublicMedicine } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { use, useEffect, useState } from "react"
import BreadCrumb from "@/Components/Common/BreadCrumb";

export default function MedicineDetailPage({ params }) {
    const breadcrumb = [
        {
            title: "Thuốc",
            url: '/medicine'
        }
    ]
    
    const [medicine, setMedicine] = useState()
    const [medicineList, setMedicineList] = useState([])

    const { slug } = use(params);

    const {data: dataMedicine, isLoading: isLoadingMedicine} = useQuery({
        queryKey: [`${APIPublicMedicine}/${slug}`],
        queryFn: () => request({
            url: `${APIPublicMedicine}/${slug}`,
            method: "GET",
        }),
    })
    
    const {data: dataMedicineList, isLoading: isLoadingMedicineList} = useQuery({
        queryKey: [`${APIPublicMedicine}`],
        queryFn: () => request({
            url: `${APIPublicMedicine}`,
            method: "GET",
            params: {
                limit: 5
            }
        }),
    })
    
    useEffect(() => {
        if(dataMedicine) {
            setMedicine(dataMedicine.data.data)
        }
        
        if(dataMedicineList) {
            setMedicineList(dataMedicineList.data.data.data)
        }
    }, [isLoadingMedicine, isLoadingMedicineList]);

    return (
        <div className="screen">
            <BreadCrumb props={breadcrumb} />
            <div className="grid grid-cols-4 gap-5">
                <div className="col-start-1 col-end-4">
                    <div className="grid grid-cols-5 gap-5 mb-5">
                        <div className="col-start-1 col-end-3 flex items-end bg-white">
                            <div className="image-full rounded-xl shadow">
                                <img src={medicine?.image} alt="AAAA" />
                            </div>
                        </div>
                        <div className="col-start-3 col-end-6 flex flex-col gap-4 shadow rounded-xl p-4 bg-white">
                            <div className="">
                                <h3 className="text-xlarge font-bold">{medicine?.name}</h3>
                            </div>
                            <div className="grid grid-cols-[10rem_1fr] gap-4">
                                <h3 className="text-medium font-bold">Hoạt chất:</h3>
                                <p className="text-large">{medicine?.active_ingredient}</p>
                            </div>
                            <div className="grid grid-cols-[10rem_1fr] gap-4">
                                <h3 className="text-medium font-bold">Dạng bào chế:</h3>
                                <p className="text-large">{medicine?.dosage_form}</p>
                            </div>
                            <div className="grid grid-cols-[10rem_1fr] gap-4">
                                <h3 className="text-medium font-bold">Chỉ định:</h3>
                                <p className="text-large">{medicine?.indication}</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow rounded-xl mb-10 p-4 bg-white">
                        <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: medicine?.content}}></p>
                    </div>
                </div>
                <div className="col-start-4 col-end-5 flex flex-col gap-5">
                    <h2 className="text-xlarge font-bold mb-1">Xem thêm</h2>
                    {
                    medicineList?.length != 0 && medicineList.map((medicine, index) => (
                            <Link href={medicine.slug} key={`medicine-new-${index}`}>
                                <div className="flex gap-4 shadow overflow-hidden rounded-md bg-white">
                                    <div className="max-w-[100px] max-h-[80px] shrink-0 overflow-hidden">
                                        <img className="w-full h-full object-cover object-bottom" src={medicine.image ? medicine.image : "/images/error-image.png"} alt={medicine.name} />
                                    </div>
                                    <div className="p-1 flex-1 shrink">
                                        <h3 className="line-clamp-1 text-medium font-bold">{medicine.name}</h3>
                                        <p className="line-clamp-1 w-full text-small" dangerouslySetInnerHTML={{__html: medicine.active_ingredient}}></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    
    )
}