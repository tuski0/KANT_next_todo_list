import { Suspense } from "react";
import { notFound } from "next/navigation";
import TodoDetails from "@/app/domains/todo/components/TodoDetails";
import { getCategories } from "@/app/domains/todo/queries/getCategories.query";
import { getTodoById } from "@/app/domains/todo/queries/getTodoById.query";

// params는 Promise이므로 Suspense 안쪽 컴포넌트에서 await
async function TodoDetailSection({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
    const { id } = await params;
    const [todo, categories] = await Promise.all([
        getTodoById(id),
        getCategories(),
    ]);

    // 없는 id이거나 내 할 일이 아니면 not-found.tsx 표시
    if (!todo) {
        notFound();
    }

    return <TodoDetails todo={todo} categories={categories} />;
}

export default function TodoDetailPage({
    params,
}: PageProps<"/todo/[id]">): React.JSX.Element {
    return (
        <div className="flex justify-center px-4 py-10">
            <Suspense
                fallback={
                    <p className="text-xl text-gray-500 animate-pulse">
                        할 일을 불러오는 중...
                    </p>
                }
            >
                <TodoDetailSection params={params} />
            </Suspense>
        </div>
    );
}
