import "./globals.css";

export const metadata = {
  title: "Admin Panel - Dashboard",
  description: "TheAM",
};

import ClientLayout from "./client-layout";


export default function RootLayout({ children }) {
    return (
        <html lang="en" className={""}>
            <body className={`font-primary w-screen overflow-x-hidden bg-black`}>
                {/* <Suspense fallback={null}> */}
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                {/* </Suspense> */}
            </body>
        </html>
    );
}