import TanstackWrapper from "@/Layout/TanstackWrapper";
import StoreProvider from "@/store/Provider";
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import "../../public/scss/app.scss";
import ReduxProvider from "@/redux/Provider";

config.autoAddCss = false;
export const metadata = {
    title: "NXTRWG",
    description: "Graduation project",
    icons: {
        icon: '/images/health-32.png'
    }
};

export default function RootLayout({children}) {
    return (
        <html lang="vn" className="scroll-smooth">
            <ReduxProvider>
                <StoreProvider>
                    <TanstackWrapper>
                        <body>
                            {children}
                        </body>
                    </TanstackWrapper>
                </StoreProvider>
            </ReduxProvider>
        </html>
    );
}