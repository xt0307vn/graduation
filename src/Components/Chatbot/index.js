"use client"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Message from "@/Components/Chatbot/Message";
import geminiApi from "@/Utils/GeminiApi";
import {information} from '@/Data/infomation'
import formatResponseGemini from "@/Utils/CustomFunction/FormatResponseGemini";
import { markdownToHtml } from "@/Utils/CustomFunction/MarkdownToHtml";

export default function Chatbot() {
    
    const [message, setMessage] = useState('')
    const [showChatbot, setShowChatbot] = useState(false)
    const [history, setHistory] = useState([
        // {
        //     hide: true,
        //     role: 'user',
        //     message: information
        // }
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
        const res = await geminiApi(message, reHistory)
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
    
    
    return (
        <div className="fixed bottom-0 right-0 mb-5 mr-5">
            <div className="bg-primary rounded-full p-2 mt-3 relative w-[50px] h-[50px] chatbot__toggle">
                <div className={`image-xsmall transition-all cursor-pointer absolute translate-x-[-50%] translate-y-[-50%] top-2/4 left-2/4 ${showChatbot ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} onClick={() => setShowChatbot(!showChatbot)}>
                    <img src="/images/chatbot.png" />
                </div>
                <div className={`image-xsmall transition-all cursor-pointer absolute translate-x-[-50%] translate-y-[-50%] top-2/4 left-2/4 flex items-center justify-center ${showChatbot ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`} onClick={() => setShowChatbot(!showChatbot)}>
                    <FontAwesomeIcon className="text-white text-2xlarge " icon={faXmark} />
                </div>
            </div>
            <div className={`h-[500px] w-[400px] rounded-lg absolute top-0 right-0 translate-y-[-100%] bg-white overflow-hidden shadow-lg origin-bottom-right chatbot__wrapper transition-all ${showChatbot ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="chatbot__header bg-primary px-4 py-2 flex items-center gap-2 shadow-md">
                    <div className="image-small bg-white p-2 rounded-full">
                        <img src="/images/chatbot.png" alt="chatbot" />
                    </div>
                    <h3 className="text-white font-bold text-large">Chatbot</h3>
                </div>
                <div ref={chatBotRef} className="chat__body flex flex-col flex-1 overflow-y-auto">
                    <div className="message chatbot__message">
                        <div className="chatbot__icon">
                            <FontAwesomeIcon icon={faRobot} />
                        </div>
                        <p className="message__text">Xin chào!!! Tôi có thể giúp gì cho bạn🎉🎉🎉</p>
                    </div>
                    {
                        history.map((item, index) => (
                            <Message key={'chatbot-' + index} chat={item} />
                        ))
                    }
                </div>
                <div className="chatbot__footer">
                    <form action="#" onSubmit={handleSubmit} className="my-2 mx-4 border-current border-[0.0625rem] border-solid rounded-full flex overflow-hidden p-1 chatbot__form">
                        <input className="flex-1 mx-2 min-w-0" type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="bg-primary text-white rounded-full w-7 h-7 shrink-0 flex justify-center items-center p-3" onClick={handleSubmit} type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}