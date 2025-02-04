import LayoutAdmin from "@/Layout/Admin";

export const metadata = {
    title: "NXTRWG Administrator",
    description: "Graduation project",
    icons: {
        icon: '/images/health-32.png'
    }
};

export default function Layout({children}) {
    
    return (
        <LayoutAdmin>
            {children}
        </LayoutAdmin>
    )
}
