"use client"

import BreadCrumbAdmin from "@/Components/Common/BreadCrumb/Admin";
import Link from "next/link";
import { Button, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { APIDisease, APIMedicine } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { useRouter } from "next/navigation";
import { use } from "react"

export default function MedicineDetailPage({ params }) {
    const router = useRouter()
    const breadcrumb = [
        {
            title: "Thuoc",
            url: '/admin/medicine'
        }
    ]

    const { slug } = use(params);

    const {data, isLoading} = useQuery({
        queryKey: [`${APIDisease}/${slug}`],
        queryFn: () => request({
            url: `${APIDisease}/${slug}`,
            method: "GET",
        }),
    })
    console.log(data)

    const handleBack = () => {
        router.back()
    }

    return (
        <>
            <div className="mb-5">
                <Button size="small" variant="contained" onClick={handleBack} className="bg-primary">Trở lại</Button>
            </div>
            <div className="p-5 bg-white rounded shadow">
                <div className="mb-5 flex justify-between">
                    <p className="text-large font-medium">Thông tin bệnh</p>
                    <nav className="flex gap-5">
                        <Link href={`/admin/medicine/update/${data?.data?.id}`}> <Tooltip title={"Chỉnh bệnh"} arrow>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                        </Tooltip> </Link> <Link href={'#'}> <Tooltip title={"Xoá bệnh"} arrow>
                        <FontAwesomeIcon icon={faTrash} className="text-large text-red-600 px-5 py-1 border-2 rounded-md border-red-600" />
                    </Tooltip> </Link>
                    </nav>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    <div className="flex items-end">
                        <div className="image-full rounded-xl">
                            <img src={data?.data?.data?.image} alt="AAAA" />
                        </div>
                    </div>
                    <div className="col-start-2 col-end-4 flex flex-col gap-4">
                        <div className="grid grid-cols-[10rem_1fr] gap-4">
                            <h3 className="text-medium">Tên bệnh:</h3>
                            <p className="text-large">{data?.data?.data?.name}</p>
                        </div>
                        <div className="grid grid-cols-[10rem_1fr] gap-4">
                            <h3 className="text-medium">Tiêu đề:</h3>
                            <p className="text-large">{data?.data?.data?.title}</p>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-4">
                        <div>
                            <h3 className="text-medium">Tổng quan:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.overview}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Triệu chứng:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.symptoms}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Nguyên nhân:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.causes}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Đối tượng nguy cơ:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.risk_factors}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Chuẩn đoán:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.diagnosis}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Phòng ngừa bệnh:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.disease_prevention}}></p>
                        </div>
                        <div>
                            <h3 className="text-medium">Cách điều trị:</h3>
                            <p className="content-format ql-editor" dangerouslySetInnerHTML={{__html: data?.data?.data?.treatment_methods}}></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    
    )
}