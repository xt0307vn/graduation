"use client"

import Blog from "@/Components/Blog";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { APIPublicPost } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { useEffect, useState } from "react";

export default function BlogPage({props}) {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    
    const {data: dataPost, isLoading: isLoadingPost} = useQuery({
        queryKey: [APIPublicPost, {page: page, search: search}],
        queryFn: () => request({
            url: APIPublicPost,
            method: "GET",
            params: {
                page: page,
                limit: 10,
                search: search
            }
        }),
    })
    
    const breadcrumb = [
        {
            url: "/post",
            title: "Góc chia sẻ"
        }
    ]
    
    useEffect(() => {
        if (dataPost) {
            setPost(dataPost?.data?.data?.data)
        }
    }, [isLoadingPost]);
    return (
        <div className="screen">
            <BreadCrumb props={breadcrumb} />
            <div className="blog__list grid grid-cols-2 gap-5 pb-10">
                {post && post.map((item, index) => {
                    return(
                        <Blog key={index} data={item}/>
                    )
                })}
            </div>
        </div>
    )
}