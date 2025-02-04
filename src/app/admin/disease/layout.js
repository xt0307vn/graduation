import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Quản lý bệnh lý'
}
export default function LayoutAminMedicine({ children }) {
    return(
        <>{children}</>
    )
}