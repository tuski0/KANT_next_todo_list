import { Suspense } from "react";
import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { LogoutAction } from "@/app/domains/auth/actions/logout.action";
import Link from "next/link";

async function AuthButton() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <div className="flex gap-x-5">
                <Link
                    href="/join"
                    className="flex items-center justify-center bg-white text-black h-10 w-20 rounded-2xl"
                >
                    JOIN
                </Link>
                <Link
                    href="/login"
                    className="flex items-center justify-center bg-white text-black h-10 w-20 rounded-2xl"
                >
                    LOGIN
                </Link>
            </div>
        );
    }

    return (
        <form action={LogoutAction}>
            <button
                type="submit"
                className="flex items-center justify-center bg-white text-black h-10 w-20 cursor-pointer rounded-2xl"
            >
                LOGOUT
            </button>
        </form>
    );
}
// 로그인 정보(쿠키)는 Suspense 안쪽 AuthButton에서만 읽어서
// 헤더 나머지 부분은 정적으로 먼저 보여줄 수 있게 함
export default function Header(): React.JSX.Element {
    return (
        <>
            <header className="flex w-full h-20 px-15 bg-black text-white items-center justify-between text-xl">
                <div className="">TO DO LIST</div>
                <Suspense fallback={<div className="h-10 w-45" />}>
                    <AuthButton />
                </Suspense>
            </header>
        </>
    );
}
