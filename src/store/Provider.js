"use client"

import Context from "@/store/Context";
import { useReducer } from "react";
import reducer, { initState } from "@/store/reducer";

export default function StoreProvider({children}) {

    const [state, dispatch ] = useReducer(reducer, initState)
    return(
        <Context.Provider value={[state, dispatch ]}>
            { children }
        </Context.Provider>
    )
}