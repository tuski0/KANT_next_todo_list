import "./globals.css";
import { Jua } from "next/font/google";
import Header from "@/app/shared/Header";
import Footer from "@/app/shared/Footer";

const mainFont = Jua({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ko" className={mainFont.className}>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
