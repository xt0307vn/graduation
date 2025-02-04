import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Đăng nhập'
}

export default function LoginLayout({ children }) {
    return(
        <>{ children }</>
    )
}