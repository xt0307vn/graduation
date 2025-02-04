"use client"

import DiseaseSimple from "@/Components/Disease/DiseaseSimple";
import DiseaseEnhanced from "@/Components/Disease/DiseaseEnhanced";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import {useQuery } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIDisease, APIPublicDiseaseType } from "@/Utils/Axios/APIs";
import * as constants from "@/constants";
import { useEffect, useState } from "react";

export default function DiseasePage({props}) {
    const subject = [
        {
            title: "Bệnh người cao tuổi",
            imgUrl: "/images/old-man.png",
            diseases: [
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                }
            ],
            url: "#"
        },
        {
            title: "Bệnh người cao tuổi",
            imgUrl: "/images/old-man.png",
            diseases: [
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                }
            ],
            url: "#"
        },
        {
            title: "Bệnh người cao tuổi",
            imgUrl: "/images/old-man.png",
            diseases: [
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                },
                {
                    url: "#",
                    title: "Tăng huyết áp"
                }
            ],
            url: "#"
        }
    ]
    
    const [popular, setPopular] = useState([])
    const [seasonal, setSeasonal] = useState([])

    const breadcrumb = [
        {
            url: "/disease",
            title: "Tra cứu bệnh"
        }
    ]
    
    const {data: dataPopular, isLoading: isLoadingPopular} = useQuery({
        queryKey: ['Popular'],
        queryFn: () => request({
            url: APIPublicDiseaseType,
            method: "GET",
            params: {
                id: constants.TYPE_POPULAR
            }
        })
    })
    
    const {data: dataSeasonal, isLoading: isLoadingSeasonal} = useQuery({
        queryKey: ['Seasonal'],
        queryFn: () => request({
            url: APIPublicDiseaseType,
            method: "GET",
            params: {
                id: constants.TYPE_SEASONAL,
                limit: 10
            }
        })
    })
    
    useEffect(() => {
        if (dataPopular) {
            setPopular(dataPopular?.data?.data)
        }
        
        if (dataSeasonal) {
            setSeasonal(dataSeasonal?.data?.data)
        }
    }, [isLoadingPopular, isLoadingSeasonal]);

    return(
        <main className="main pb-10">
            <div className="main--inner screen">
                <BreadCrumb props={breadcrumb} />
                <div className="mb-10 bg-white py-5 px-4 rounded-md">
                    <h2 className="text-xlarge font-bold mb-4">Bệnh phổ biến</h2>
                    <div className="disease__popular grid grid-cols-5 gap-5 mb-4">
                        {
                            popular.map((item, index) => {
                                return (
                                    <DiseaseSimple props={item} key={"popular" + index}/>
                                )
                            })
                        }
                    </div>
                </div>
                {/*<div className="mb-10">*/}
                {/*    <h2 className="text-xlarge font-bold mb-4">Bệnh theo đối tượng</h2>*/}
                {/*    <div className="grid grid-cols-3 gap-4">*/}
                {/*        {*/}
                {/*            subject.map((item, index) => {*/}
                {/*                return (*/}
                {/*                    <DiseaseEnhanced props={item} key={"subject" + index} />*/}
                {/*                )*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="bg-white py-5 px-4 rounded-md">
                    <h2 className="text-xlarge font-bold mb-4">Bệnh theo mùa</h2>
                    <div className="disease__popular grid grid-cols-5 gap-5 mb-4">
                        {
                            seasonal.map((item, index) => {
                                return (
                                    <DiseaseSimple props={item} key={"popular" + index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}