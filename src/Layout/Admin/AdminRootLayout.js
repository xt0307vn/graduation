import { AppProvider } from "@toolpad/core/nextjs";
import customRouter from "@/Utils/CustomRouter";
import { DashboardLayout } from "@toolpad/core";
import { createTheme, ThemeProvider } from "@mui/material";
import NAVIGATION from "@/Layout/Admin/Menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

const theme = createTheme({
    typography: {
        bodyRegular: {
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: 400,
            color: "red",
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    bodyRegular: "p",
                },
            },
        },
    },
});

export default function AdminRootLayout({ children }) {

    const demoTheme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-toolpad-color-scheme',
        },
        colorSchemes: { light: true },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 600,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    return(
        <ThemeProvider theme={theme}>
            <AppProvider router={customRouter(useRouter())} navigation={NAVIGATION} branding={{
                logo: <div className="flex items-center h-full font-bold text-large color-primary"><h1 className="">NXTRWG</h1></div>,
                title: ""
            }} theme={demoTheme}>
                <DashboardLayout className="text-xsmall shadow-lg">
                    <div className="p-5 bg-background-light admin--inner">
                        {children}
                    </div>
                </DashboardLayout>
            </AppProvider>
        </ThemeProvider>
    )
}