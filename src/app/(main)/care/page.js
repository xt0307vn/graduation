"use client"

import BreadCrumb from "@/Components/Common/BreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingMedical, faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";
import Message from "@/Components/Care/Message";
import { useEffect, useRef, useState } from "react";
import { information } from "@/Data/infomation";
import geminiApi from "@/Utils/GeminiApi";
import formatResponseGemini from "@/Utils/CustomFunction/FormatResponseGemini";
import { markdownToHtml } from "@/Utils/CustomFunction/MarkdownToHtml";

export default function CarePage() {
    
    const breadcrumb = [
        {
            url: "/care",
            title: "Chăm sóc cá nhân"
        }
    ]
    
    const [message, setMessage] = useState('')
    const [history, setHistory] = useState([
    ])
    const chatBotRef = useRef()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        
        setHistory(history => [
            ...history, {
                role: 'user',
                message: message
            }
        ])
        
        setTimeout(() => {
            setHistory(history => [
                ...history, {
                    role: 'chatbot',
                    message: 'Đang tải...'
                }
            ])
        }, 600)
        
        generateChatbotAi([...history], `${message}`)
    }
    
    const generateChatbotAi = async (history, message) => {
        const updateHistory = (text) => {
            setHistory(prve => [
                ...prve.filter(item => item.message !== "Đang tải..."),
                {role: 'chatbot', message: text}
            ])
        }
        // console.log(history)
        let reHistory = history.map((item) => ({
            role: item.role == 'chatbot' ? 'model' : 'user',
            parts: [{text: item.message}],
        }))
        const res = await geminiApi(message, reHistory,  true)
        markdownToHtml(res.response.text()).then(data => {
            updateHistory(data)
        })
        
    }
    
    useEffect(() => {
        chatBotRef.current?.scrollTo({
            top: chatBotRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [message, history]);
    
    return(
        <div className="screen min-h-screen flex flex-col">
            {/*<BreadCrumb props={breadcrumb} />*/}
            <div className="flex flex-col flex-1 mt-5 relative">
                <div className="bg-primary p-4 py-3 sticky top-5 flex items-center gap-2 shadow-md rounded-full z-30">
                    <div className="bg-white w-7 h-7 flex items-center justify-center rounded-full">
                        <FontAwesomeIcon icon={faHandHoldingMedical} />
                    </div>
                    <h3 className="text-white font-bold text-large">Lộ trình chăm sóc sức khoẻ</h3>
                </div>
                <div ref={chatBotRef} className="chat__body flex flex-col flex-1 overflow-y-auto">
                    <div className="message chatbot__message">
                        <div className="chatbot__icon">
                            <FontAwesomeIcon icon={faRobot} />
                        </div>
                        <p className="message__text">Xin chào!!! Hãy cho tôi biết bạn đang bị bệnh gì🎉🎉🎉</p>
                    </div>
                    {
                        history.map((item, index) => (
                            <Message key={'chatbot-' + index} chat={item} />
                        ))
                    }
                </div>
                <div className="chatbot__footer mt-4 sticky bottom-5">
                    <form action="#" onSubmit={handleSubmit} className="my-2 border-gray-400 border-[0.0625rem] border-solid rounded-full flex overflow-hidden p-1 chatbot__form bg-white">
                        <input className="flex-1 mx-2 min-w-0 bg-transparent" type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="bg-primary text-white rounded-full w-9 h-9 shrink-0 flex justify-center items-center p-3" onClick={handleSubmit} type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}