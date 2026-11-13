"use client";

import { useOptimistic, useState, useTransition } from "react";
import { deleteTodoAction, toggleTodoAction } from "../actions/todo.action";
import type { Category, Todo } from "../types/todo.types";
import TodoItem from "./TodoItem";

interface TodoListProps {
    items: Todo[];
    categories: Category[];
}

// 낙관적 업데이트 종류 (완료 토글 / 삭제)
type OptimisticAction =
    | { type: "toggle"; id: string; isCheck: boolean }
    | { type: "delete"; id: string };

export default function TodoList({
    items,
    categories,
}: TodoListProps): React.JSX.Element {
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState("");

    // 서버 응답 전에 화면에 먼저 반영 (실패하면 transition 종료 후 items로 자동 롤백)
    const [optimisticItems, setOptimisticItems] = useOptimistic(
        items,
        (currentItems, action: OptimisticAction) => {
            if (action.type === "toggle") {
                return currentItems.map((item) =>
                    item.id === action.id
                        ? { ...item, isCheck: action.isCheck }
                        : item,
                );
            }
            return currentItems.filter((item) => item.id !== action.id);
        },
    );

    const onToggle = (id: string, isCheck: boolean) => {
        setErrorMessage("");
        startTransition(async () => {
            setOptimisticItems({ type: "toggle", id, isCheck });
            try {
                await toggleTodoAction(id, isCheck);
            } catch (error) {
                console.error("완료 상태 변경 실패:", error);
                setErrorMessage("완료 상태 변경에 실패했습니다.");
            }
        });
    };

    const onDelete = (id: string) => {
        if (!confirm("이 할 일을 삭제할까요?")) return;

        setErrorMessage("");
        startTransition(async () => {
            setOptimisticItems({ type: "delete", id });
            try {
                await deleteTodoAction(id);
            } catch (error) {
                console.error("삭제 실패:", error);
                setErrorMessage("삭제에 실패했습니다.");
            }
        });
    };

    const doneCount = optimisticItems.filter((item) => item.isCheck).length;

    return (
        <section className="flex flex-col gap-4 px-5 py-10 min-w-0">
            <div className="flex items-center justify-between text-xl">
                <h2 className="text-3xl">TO DO</h2>
                <span>
                    완료 {doneCount} / 전체 {optimisticItems.length}
                </span>
            </div>

            {/* 백그라운드 동기화 / 오류 상태 표시 */}
            {isPending && (
                <p className="text-gray-500 animate-pulse">
                    서버와 동기화 중...
                </p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* 빈 데이터 상태 */}
            {optimisticItems.length === 0 ? (
                <p className="border-2 border-dashed rounded-2xl p-10 text-center text-gray-500 text-xl">
                    아직 등록된 할 일이 없습니다. 왼쪽 폼에서 추가해 보세요!
                </p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {optimisticItems.map((item) => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            category={categories.find(
                                (category) => category.id === item.categoryId,
                            )}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
