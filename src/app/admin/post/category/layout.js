import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Quản lý danh mục'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}