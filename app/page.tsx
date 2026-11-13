import { Suspense } from "react";
import CategoryForm from "@/app/domains/todo/components/CategoryForm";
import TodoInputForm from "@/app/domains/todo/components/TodoInputForm";
import TodoList from "@/app/domains/todo/components/TodoList";
import TodoListSkeleton from "@/app/domains/todo/components/TodoListSkeleton";
import { getCategories } from "@/app/domains/todo/queries/getCategories.query";
import { getTodos } from "@/app/domains/todo/queries/getTodos.query";

// 서버 컴포넌트: 쿠키(로그인 정보)로 할 일·카테고리를 조회한 뒤
// 상호작용이 필요한 폼·목록(클라이언트 컴포넌트)에 Props로 전달
async function TodoSection(): Promise<React.JSX.Element> {
    // 두 조회는 서로 의존하지 않으므로 병렬로 요청
    const [todos, categories] = await Promise.all([
        getTodos(),
        getCategories(),
    ]);

    return (
        <>
            {/* 왼쪽: 할 일 입력 + 카테고리 관리 */}
            <div className="min-w-0 self-start xl:sticky xl:top-6">
                <TodoInputForm categories={categories} />
                <CategoryForm categories={categories} />
            </div>
            <TodoList items={todos} categories={categories} />
        </>
    );
}

export default function Home(): React.JSX.Element {
    return (
        <div className="grid grid-cols-1 items-start gap-8 px-4 py-10 xl:grid-cols-2">
            {/* 데이터 조회 중에는 스켈레톤(로딩 UI)을 먼저 스트리밍 */}
            <Suspense fallback={<TodoListSkeleton />}>
                <TodoSection />
            </Suspense>
        </div>
    );
}
