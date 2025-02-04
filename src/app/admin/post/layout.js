import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Quản lý bài viết'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}