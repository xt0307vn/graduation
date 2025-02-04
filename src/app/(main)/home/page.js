"use client"

import Medicine from "@/Components/Medicine";
import Blog from "@/Components/Blog"
import { HeadingSection } from "@/Components/HeadingSection";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIPublicDisease, APIPublicMedicine, APIPublicPost } from "@/Utils/Axios/APIs";
import DiseaseSimple from "@/Components/Disease/DiseaseSimple";
import { useEffect, useState } from "react";

export default function Home() {
    const [medicine, setMedicine] = useState([])
    const [disease, setDisease] = useState([])
    const [post, setPost] = useState([])
    const {data: dataMedicine, isLoading: isLoadingMedicine} = useQuery({
        queryKey: [APIPublicMedicine],
        queryFn: () => request({
            url: APIPublicMedicine,
            method: "GET",
            params: {
                limit: 10
            }
        })
    })
    
    const {data: dataDisease, isLoading: isLoadingDisease} = useQuery({
        queryKey: [APIPublicDisease],
        queryFn: () => request({
            url: APIPublicDisease,
            method: "GET",
            params: {
                limit: 10
            }
        })
    })
    
    const {data: dataPost, isLoading: isLoadingPost} = useQuery({
        queryKey: [APIPublicPost],
        queryFn: () => request({
            url: APIPublicPost,
            method: "GET",
            params: {
                limit: 10
            }
        })
    })
    useEffect(() => {
        if(dataPost) {
            setPost(dataPost.data?.data?.data)
        }
        if(dataMedicine) {
            setMedicine(dataMedicine.data?.data?.data)
        }
        if(dataDisease) {
            setDisease(dataDisease.data?.data?.data)
        }
    }, [isLoadingPost, isLoadingMedicine, isLoadingDisease]);
    
    return (
        <>
            <main className="main">
                <div className="main--inner screen py-5">
                    <section className="mb-10">
                        <HeadingSection props={{name: "Thuốc", url: '/medicine'}} />
                        <div className="medicine__list grid grid-cols-5 gap-5">
                        {medicine && medicine.map((item, index) => {
                                return (
                                    <Medicine key={`medicine-${index}`} data={item} />
                                )
                            })}
                        </div>
                    </section>
                    <section className="mb-10">
                        <HeadingSection props={{name: "Bệnh", url: '/disease'}} />
                        <div className="disease__popular grid grid-cols-5 gap-5 mb-4">
                            {
                                disease && disease.map((item, index) => {
                                    return (
                                        <DiseaseSimple props={item} key={"popular" + index} />
                                    )
                                })
                            }
                        </div>
                    </section>
                    <section className="mb-10">
                        <HeadingSection props={{name: "Bài viết", url: '/post'}} />
                        <div className="blog__list grid grid-cols-2 gap-5">
                            {post && post.map((item, index) => {
                                return (
                                    <Blog key={`post-${index}`} data={item} />
                                )
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}