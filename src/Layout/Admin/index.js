"use client"

import { useEffect, useState } from "react";
import AdminRootLayout from "@/Layout/Admin/AdminRootLayout";

export default function LayoutAdmin({ children }) {
    
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return null;
    }

    return(
        <AdminRootLayout>
            {children}
        </AdminRootLayout>
    )
}