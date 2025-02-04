"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ChatbotBox from "@/Components/Care/ChatbotBox";

export default function Message({chat}) {
    
    const [steps, setSteps] = useState([])
    const [loading, setLoading] = useState('')
    useEffect(() => {
        if(chat?.role == 'chatbot') {
            if(chat?.message == 'Đang tải...') {
                setLoading(chat?.message)
            }
            const parser = new DOMParser();
            
            const doc = parser.parseFromString(chat?.message, 'text/html');
            
            const handleSteps = Array.from(doc.querySelectorAll('p strong')).map(step => {
                const stepContent = step.closest('p').nextElementSibling?.outerHTML || ""; // Lấy nội dung tiếp theo
                return {
                    title: step.textContent,
                    content: stepContent
                };
            });
            if(handleSteps.length != 0) {
                setSteps(handleSteps)
                setLoading('')
            }
            
        }
    }, [chat])
    
    return (
        !chat.hide && (
            <div className={`message ${chat?.role}__message`}>
                {chat?.role == 'chatbot' && (
                    <div className="chatbot__icon">
                        <FontAwesomeIcon icon={faRobot} />
                    </div>
                )}
                {
                    chat?.role == 'chatbot' ? (
                        <>
                            {
                                loading && <p className="message__text shadow-md">{loading}</p>
                            }
                            <ChatbotBox list={steps} />
                        </>
                    ) : (
                        <p className="message__text shadow-md" dangerouslySetInnerHTML={{__html: chat?.message}}></p>
                    )
                }
            </div>
        )
    )
}