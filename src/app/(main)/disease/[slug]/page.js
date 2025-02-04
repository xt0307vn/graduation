"use client"

import BreadCrumb from "@/Components/Common/BreadCrumb";
import Link from "next/link";
import { useQueries, useQuery } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIDisease, APIDiseaseType } from "@/Utils/Axios/APIs";
import * as constants from "@/constants";
import { use, useEffect, useState } from "react";
import formatDate from "@/Utils/CustomFunction/FormatDate";

export default function({params}) {
    const breadcrumb = [
        {
            url: "/disease",
            title: "Tra cứu bệnh"
        },
    ]
    
    const [disease, setDisease] = useState()
    
    const { slug } = use(params);
    
    const {data: dataDisease, isLoading: isLoadingDisease} = useQuery({
        queryKey: [APIDisease],
        queryFn: () => request({
            url: `${APIDisease}/${slug}`,
            method: "GET",
        })
    },)
    
    useEffect(() => {
        if(dataDisease) {
            setDisease(dataDisease.data.data)
        }
    }, [isLoadingDisease]);
    
    return(
        <div className="screen">
            <BreadCrumb props={breadcrumb} />
            <div className="grid grid-cols-8 gap-4 pb-10">
                <nav className="col-start-1 col-end-3 sticky top-5 h-max bg-white shadow-md p-4 rounded-md">
                    <ul className="flex flex-col gap-5">
                        <li>
                            <Link href={`#overview`}>Tổng quan chung</Link>
                        </li>
                        <li>
                            <Link href={`#symptoms`}>Triệu chứng</Link>
                        </li>
                        <li>
                            <Link href={`#causes`}>Nguyên nhân</Link>
                        </li>
                        <li>
                            <Link href={`#risk_factors`}>Đối tượng nguy cơ</Link>
                        </li>
                        <li>
                            <Link href={`#diagnosis`}>Chẩn đoán</Link>
                        </li>
                        <li>
                            <Link href={`#disease_prevention`}>Phòng ngừa bệnh</Link>
                        </li>
                        <li>
                            <Link href={`#treatment_methods`}>Điều trị</Link>
                        </li>
                    </ul>
                </nav>
                <div className="col-start-3 col-end-9 bg-white p-4 shadow-md rounded-md">
                    <div className="mb-5">
                        <h1 className="font-bold text-2xlarge">{disease?.title}</h1>
                        <p className="text-primary">{formatDate(disease?.created_at)}</p>
                    </div>
                    <div className="text-black">
                        <h2 id="overview" className=" font-bold text-large">Tổng quan chung</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.overview}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="symptoms" className=" font-bold text-xlarge">Triệu chứng</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.symptoms}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="causes" className=" font-bold text-xlarge">Nguyên nhân</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.causes}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="risk_factors" className=" font-bold text-xlarge">Đối tượng nguy cơ</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.risk_factors}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="diagnosis" className=" font-bold text-xlarge">Chuẩn đoán</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.diagnosis}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="disease_prevention" className=" font-bold text-xlarge">Phòng ngừa bệnh</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.disease_prevention}}></p>
                    </div>
                    <div className="text-black">
                        <h2 id="treatment_methods" className=" font-bold text-xlarge">Cách điều trị</h2>
                        <p className="ql-editor" dangerouslySetInnerHTML={{__html: disease?.treatment_methods}}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}