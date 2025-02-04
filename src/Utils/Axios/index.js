import axios from "axios";
import getCookie from "@/Utils/CustomFunction/GetCookie";

const client = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
    }
})

const request = async ({...options}, router) => {
    client.defaults.headers.common.Authorization = `Bearer ${getCookie('uat')}`;
    const onSuccess = (response) => response;
    const onError = (error) => {
        if (error?.response?.status == 403) {
            router && router.push("/403")
        }
        return error;
    }
    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error)
    }
};

export default request;