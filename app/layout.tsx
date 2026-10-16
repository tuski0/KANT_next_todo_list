import { Jua } from "next/font/google";
import "./globals.css";
import Header from "@/app/shared/Header";

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
            </body>
        </html>
    );
}
