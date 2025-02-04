import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Tạo mới danh mục'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}