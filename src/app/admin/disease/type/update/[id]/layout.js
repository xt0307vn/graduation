import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Cập nhật loại bệnh lý'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}