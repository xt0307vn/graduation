"use client"

import { useState, useEffect, useCallback, useRef, use } from "react";
import { Alert, Box, Button, Grid2 as Grid, InputBase, Slide, TextField, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHome, faList, faPenNib, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APICategory,
    APIDisease,
    APIDiseaseCreate, APIDiseaseUpdate,
    APIDiseaseUploadFile, APIMedicineCreate,
    APIMedicineUploadFile,
    APIPostUploadFile,
    APIType
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import ReactQuill from "react-quill-new";
import SelectMultiple from "@/Components/Common/SelectMultiple";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import TextEditor from "@/Components/Common/TextEditor";
import useUpate from "@/Utils/hooks/useUpate";

export default function DiseaseCreatePage({params}) {
    
    const [name, setName] = useState('')
    const [image, setImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [title, setTitle] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [causes, setCauses] = useState('');
    const [treatment_methods, setTreatmentMethods] = useState('');
    const [disease_prevention, setDiseasePrevention] = useState('');
    const [risk_factors, setRiskFactors] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [overview, setOverview] = useState('');
    const [types, setTypes] = useState([]);
    const [message, setMessage] = useState([])
    
    const {id} = use(params)
    const router = useRouter()
    
    const {data: disease, isSuccess: isDiseaseSuccess, isLoading: isDiseaseLoading} = useQuery({
        queryKey: ["DiseaseDetail"],
        queryFn: () => request({
            url: `${APIDisease}/${id}`,
            method: "GET"
        })})
    
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate} = useUpate({
        url: APIDiseaseUpdate,
        queryKeys: [APIDisease, "DiseaseDetail"],
        setMessage: setMessage
    })
    
    const handleSubmit = () => {
        CustomSwal.fire({
            title: 'Bạn chắc chắn cập nhật?',
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(result => {
            if (result.isConfirmed) {
                mutateUpdate({
                    id,
                    data: {
                        name: name,
                        image: image,
                        title: title,
                        symptoms: symptoms,
                        causes: causes,
                        treatment_methods: treatment_methods,
                        disease_prevention: disease_prevention,
                        risk_factors: risk_factors,
                        diagnosis: diagnosis,
                        types: JSON.stringify(types),
                        overview: overview,
                    }
                });
            }
        })
        
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        setImage(e.target.files[0])
    };
    
    useEffect(() => {
        if(disease) {
            setName(disease?.data?.data.name)
            setTitle(disease?.data?.data.title)
            setSymptoms(disease?.data?.data.symptoms)
            setCauses(disease?.data?.data.causes)
            setTreatmentMethods(disease?.data?.data.treatment_methods)
            setDiseasePrevention(disease?.data?.data.disease_prevention)
            setRiskFactors(disease?.data?.data.risk_factors)
            setDiagnosis(disease?.data?.data.diagnosis)
            setOverview(disease?.data?.data.overview)
            setTypes(disease?.data?.data.types.map(type => type.id))
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isDiseaseLoading, imagePreview])
    
    
    const {data} = useQuery({
        queryKey: [APIType],
        queryFn: () => request({
            method: "GET",
            url: APIType
        })
    })
    
    return (
        <div>
            <div className="mb-4 flex justify-between sticky top-0 bg-white rounded-md p-4 shadow z-50">
                <h1 className="text-large font-bold">
                    Cập nhật bệnh
                </h1>
                <div className="flex gap-4">
                    <button onClick={() => {router.back()}} className="bg-orange-600 py-1 px-4 text-white font-medium rounded shadow flex gap-2 items-center">
                        <FontAwesomeIcon icon={faTrash} />Huỷ</button>
                    <button className="bg-green-700 py-1 px-4 text-white font-medium rounded shadow flex gap-2 items-center" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faPenNib} />Cập nhật</button>
                    <Link href={"/admin/disease"} className="bg-primary text-white py-1 px-4 rounded flex gap-2 items-center shadow-md">
                        <FontAwesomeIcon icon={faList} /> Danh sách bệnh </Link>
                </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin bệnh
                    </h1>
                </div>
                <div className="">
                    <div className="grid grid-cols-5 gap-5 mb-8">
                        <div className="col-start-1 col-end-3">
                            <h3>Hình ảnh</h3>
                            <Tooltip title='Tải hình ảnh lên' arrow placement="top">
                                <div>
                                    <label htmlFor="upload-image">
                                        <div className="w-full h-[20rem] cursor-pointer overflow-hidden rounded-md overflow-hidden">
                                            <img src={imagePreview ? imagePreview : (disease?.data?.data.image ? disease?.data?.data.image : "/images/image-upload.png")} alt="Preview Image" className={`w-full h-full overflow-hidden ${imagePreview ? 'object-cover' : (disease?.data?.data.image ? 'object-cover' : 'object-contain')}`} />
                                        </div>
                                        <input type="file" id="upload-image" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col gap-4 col-start-3 col-end-6">
                            <InputFieldCustom name="Tên bệnh" value={name} onSetValue={(value) => setName(value)} error={message && message?.find(item => item.property == "name")?.message} />
                            <InputFieldCustom name="Tiêu đề" value={title} onSetValue={(value) => setTitle(value)} error={message && message?.find(item => item.property == "title")?.message} />
                            <SelectMultiple name="Loại bệnh" data={data?.data?.data?.data} onSelectValue={(value) => setTypes(value)} valueSelect={types} placeholder="Chọn loại bệnh" field="name" />
                        </div>
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Tổng quan" value={overview} onSetValue={setOverview} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "overview")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Triệu chứng" value={symptoms} onSetValue={setSymptoms} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "symptoms")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Nguyên nhân" value={causes} onSetValue={setCauses} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "causes")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Đối tượng nguy cơ" value={risk_factors} onSetValue={setRiskFactors} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "risk_factors")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Chuẩn đoán" value={diagnosis} onSetValue={setDiagnosis} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "diagnosis")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Phòng ngừa" value={disease_prevention} onSetValue={setDiseasePrevention} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "disease_prevention")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Điều trị" value={treatment_methods} onSetValue={setTreatmentMethods} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "treatment_methods")?.message} />
                    </div>
                </div>
            </div>
        </div>
    )
}