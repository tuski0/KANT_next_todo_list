import Link from "next/link";

export default function TodoNotFound(): React.JSX.Element {
    return (
        <div className="flex flex-col items-center gap-6 py-20 text-xl">
            <h2 className="text-3xl">할 일을 찾을 수 없습니다</h2>
            <p className="text-gray-500">
                삭제되었거나 다른 사용자의 할 일입니다.
            </p>
            <Link
                href="/"
                className="bg-black text-white rounded-2xl px-8 py-4"
            >
                목록으로
            </Link>
        </div>
    );
}
