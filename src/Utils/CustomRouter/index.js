// import { useRouter } from "next/navigation";

// const router = useRouter()

const customRouter = (router) => {
    return {
        pathname: router.pathname,
        push: router.push,
        replace: router.replace,
        navigate: (path) => router.push(path)
    };
}

export default customRouter