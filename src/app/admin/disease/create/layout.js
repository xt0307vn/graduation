import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Tạo mới bệnh lý'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}