import Link from "next/link";

export default function LoginInputForm() {
    return (
        <div className="flex justify-center">
            <form className="flex flex-col text-xl min-h-50 justify-center items-center">
                <div className="flex flex-col gap-x-10 gap-y-10 justify-center py-10">
                    <div className="flex items-center justify-center text-5xl">
                        <h1>LOGIN</h1>
                    </div>
                    <div className="flex flex-col justify-center gap-y-6 ">
                        <div className="flex justify-between gap-x-10">
                            <span className="h-15 w-20 bg-black text-white flex items-center justify-center rounded-xl">
                                이메일
                            </span>
                            <input
                                type="email"
                                name="email"
                                className="bg-black text-white p-3 rounded-xl"
                            />
                        </div>
                        <div className="flex justify-between gap-x-10">
                            <span className="h-15 w-20 bg-black text-white flex items-center justify-center rounded-2xl">
                                비밀번호
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="bg-black text-white p-3 rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black text-white cursor-pointer h-20 w-40 rounded-xl"
                        >
                            LOGIN
                        </button>
                        <Link
                            href="/"
                            className="flex items-center justify-center bg-black text-white cursor-pointer h-20 w-40 rounded-xl"
                        >
                            JOIN
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
