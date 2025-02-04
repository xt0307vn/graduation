import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Chi tiết thuốc'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}