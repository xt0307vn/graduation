import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Tìm kiếm'
}
export default function LayoutDisease({ children }) {
    return(
        <>{children}</>
    )
}