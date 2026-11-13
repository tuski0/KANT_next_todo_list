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

    // 배포(프로덕션) 환경에서는 Next.js가 서버 에러 내용을 숨기고
    // "Minified React error ..." 같은 코드만 넘겨주므로, 사용자에게는 고정 문구를 보여줌
    // (자세한 원인은 위 console.error와 Vercel 로그에서 확인)
    const message =
        process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

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
