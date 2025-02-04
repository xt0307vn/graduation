import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Cập nhật thuốc'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}