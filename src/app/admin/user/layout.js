import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Quản lý người dùng'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}