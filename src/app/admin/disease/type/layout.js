import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Quản lý loại bệnh lý'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}