import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Đường dẫn không tồn tại'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}