import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Đăng ký'
}

export default function SignupLayout({ children }) {
    return(
        <>{ children }</>
    )
}