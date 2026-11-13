"use client"; // 에러 바운더리는 클라이언트 컴포넌트여야 함

import { useEffect } from "react";

interface ErrorPageProps {
    error: unknown;
    retry: () => void;
}

// 페이지 렌더링 중 에러(예: Supabase 조회 실패)가 나면 보여줄 화면
export default function ErrorPage({
    error,
    retry,
}: ErrorPageProps): React.JSX.Element {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const message =
        error instanceof Error ? error.message : "알 수 없는 오류입니다.";

    return (
        <div className="flex flex-col items-center gap-6 py-20 text-xl">
            <h2 className="text-3xl">문제가 발생했습니다 😢</h2>
            <p className="text-gray-500">{message}</p>
            <button
                type="button"
                className="bg-black text-white rounded-2xl px-8 py-4 cursor-pointer"
                onClick={() => retry()}
            >
                다시 시도
            </button>
        </div>
    );
}
