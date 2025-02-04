"use client"

import AppContext from "@/Helpers/AppContext/index";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/Axios";

export default function AppProvider({children}) {
    const [cookies, setCookie, removeCookie] = useCookies(['uat']);
    const [token, setToken] = useState(cookies.uat)
    const [account, setAccount] = useState({})
    const {data: dataAccount, isLoading: isLoadingAccount} = useQuery({
        queryKey: ["Auth"],
        queryFn: () => request({
            url: 'auth/profile',
            method: "GET",
        }),
        enabled: !!token
    })
    useEffect(() => {
        if(dataAccount?.data) {
            setAccount(dataAccount?.data?.data)
        }
    }, [isLoadingAccount, token, cookies.uat]);
    return(
        <AppContext.Provider value={{token, setToken, account, setAccount}}>{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context) {
        throw new Error("Undefined Context")
    }
    
    return context
}