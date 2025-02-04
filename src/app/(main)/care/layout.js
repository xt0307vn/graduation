import { metadata as metaRoot } from "@/Layout/RootLayout";

export const metadata = {
    ...metaRoot,
    title: 'Chăm sóc cá nhân'
}
export default function LayoutDisease({ children }) {
    return(
        <>{children}</>
    )
}