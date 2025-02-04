import RootLayout from "@/Layout/RootLayout";
import AppProvider from "@/Helpers/AppContext/AppProvider";
export default function AppLayout({children}) {
    return (
        <RootLayout>
            <AppProvider>{children}</AppProvider>
        </RootLayout>
    );
}
