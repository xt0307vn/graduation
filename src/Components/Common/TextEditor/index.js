"use client"

import ReactQuill from "react-quill-new";
import request from "@/Utils/Axios";
import { APICategoryUploadFile, APIPostUploadFile } from "@/Utils/Axios/APIs";
import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const TextEditor = ({value, onSetValue, name, url="", error}) => {
    
    const reactQuillRef = useRef(null);
    
    const { mutate } = useMutation({
        mutationKey: ['UploadImage'],
        mutationFn: (formData) => request({
            url: url,
            method: "POST",
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }),
        onSuccess: (data) => {
            const url = data?.data?.url;
            const quill = reactQuillRef.current;
            if (quill && url) {
                const range = quill.getEditorSelection();
                range && quill.getEditor().insertEmbed(range.index, "image", url);
            }
        }
    })
    
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        mutate(formData)
    }
    
    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                await uploadImage(file);
            }
        };
    }, []);
    
    const toolbarOptions = {
        container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['image'],// ['link', 'image', 'video', 'formula'],
            // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction
            
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            
            ['clean']                                         // remove formatting button
        ],
        handlers: {
            image: imageHandler,
        },
    };

    const handleChange = (content) => {
        onSetValue(content);
    };
    
    useEffect(() => {
    
    }, []);

    return (
        <>
            <label className={`text-small mb-1 block ${error && 'text-red-600'}`}>{name}</label>
            <ReactQuill ref={reactQuillRef} theme="snow" modules={{toolbar: toolbarOptions}} value={value} onChange={handleChange}  className={`${error && 'error'}`}/>
            <p className="text-red-600 text-xsmall mt-1">{error && error}</p>
        </>
    
    )
}

export default TextEditor