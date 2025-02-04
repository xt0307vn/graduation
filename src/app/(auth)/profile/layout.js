import Layout from "@/Layout";
import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Thông tin cá nhân'
}

export default function LoginLayout({ children }) {
    return(
        <Layout>{ children }</Layout>
    )
}