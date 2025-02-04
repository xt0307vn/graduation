import Layout from "@/Layout/index"
import {metadata as metaRoot} from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
}

export default function MainLayout({children}) {
    return (
        <Layout>
            { children }
        </Layout>
    )
}