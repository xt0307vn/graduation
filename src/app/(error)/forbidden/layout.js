import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Đường dẫn bị cấm'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}