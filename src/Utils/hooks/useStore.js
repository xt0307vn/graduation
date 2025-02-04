import { useContext } from "react";
import Context from "@/store/Context";

export default function useStore() {
    return useContext(Context)
}