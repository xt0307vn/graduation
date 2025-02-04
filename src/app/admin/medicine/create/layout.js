import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Thêm thuốc'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}