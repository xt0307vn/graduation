"use client"


import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { APIPublicPost } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import formatDate from "@/Utils/CustomFunction/FormatDate";

export default function BlogDetalPage({params}) {
    const breadcrumb = [
        {
            title: "Góc chia sẻ",
            url: '/post'
        }
    ]
    
    const [post, setPost] = useState()
    const [postList, setPostList] = useState([])
    
    const { slug } = use(params);
    
    const {data: dataPost, isLoading: isLoadingPost, isSuccess: isSuccessPost} = useQuery({
        queryKey: [`${APIPublicPost}/${slug}`],
        queryFn: () => request({
            url: `${APIPublicPost}/${slug}`,
            method: "GET",
        }),
    })
    
    const {data: dataPostList, isLoading: isLoadingPostList, isSuccess: isSuccessPostList} = useQuery({
        queryKey: [`${APIPublicPost}`],
        queryFn: () => request({
            url: `${APIPublicPost}`,
            method: "GET",
            params: {
                limit: 5
            }
        }),
    })
    
    useEffect(() => {
        if(dataPost) {
            setPost(dataPost?.data?.data)
        }
        
        if(dataPostList) {
            setPostList(dataPostList?.data?.data?.data)
        }
    }, [isSuccessPost, isSuccessPostList]);
    
    return(
        <div className="screen">
            <BreadCrumb props={breadcrumb} />
            <div className="grid grid-cols-3 gap-8 pb-10">
                <div className="col-start-1 col-end-3">
                    <div className="bg-white px-4 py-5 rounded-md shadow mb-5">
                        <h1 className="text-2xlarge font-bold">{post?.title}</h1>
                        <div className="flex gap-4 items-center">
                            <p className="bg-gray-200 px-4 py-1 rounded-full text-black inline">{post?.category.name}</p>
                            <p className="text-primary">{formatDate(post?.created_at)}</p>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-5 rounded-md shadow">
                        <p className="ql-editor !p-0" dangerouslySetInnerHTML={{__html: post?.content}}></p>
                    </div>
                </div>
                <div className="col-start-3 col-end-4">
                    <h2 className="text-xlarge font-bold mb-5">Bài viết mới nhất</h2>
                    <div className="w-full flex flex-col gap-4">
                        {
                            postList.length != 0 && postList.map((post, index) => (
                                <div className="flex gap-4 shadow overflow-hidden rounded-md" key={`post-new-${index}`}>
                                    <div className="max-w-[100px] max-h-[80px] shrink-0 overflow-hidden">
                                        <img className="w-full h-full object-cover" src={post.image ? post.image : '/images/error-image.png'} alt={post.title} />
                                    </div>
                                    <div className="p-1 flex-1 shrink">
                                        <h3 className="line-clamp-1 text-medium font-bold">{post.title}</h3>
                                        <p className="line-clamp-1 w-full text-small" dangerouslySetInnerHTML={{ __html: post.content}}></p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}