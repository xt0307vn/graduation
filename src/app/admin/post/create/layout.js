import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Tạo mới bài viết'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}