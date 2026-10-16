import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="flex w-full h-20 px-15 bg-black text-white items-center justify-between text-xl">
                <div className="">TO DO LIST</div>
                <div className="flex gap-x-5">
                    <Link
                        href="/"
                        className="flex items-center justify-center bg-white text-black h-10 w-20"
                    >
                        JOIN
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center bg-white text-black h-10 w-20"
                    >
                        SIGN IN
                    </Link>
                </div>
            </header>
        </>
    );
}
