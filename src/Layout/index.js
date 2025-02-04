"use client"

import Header from '@/Layout/Header'
import Footer from "@/Layout/Footer";
import Chatbot from "@/Components/Chatbot";
import { useEffect, useState } from "react";

export default function Layout({children}) {
    
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return null;
    }
    
    return (
        <>
            <Header />
            <main className="bg-background-gray-light-100">{ children }</main>
            <Footer />
            <Chatbot />
        </>
    )
}