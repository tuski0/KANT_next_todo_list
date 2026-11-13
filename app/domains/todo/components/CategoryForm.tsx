"use client";

import { INITIAL_ACTION_STATE } from "@/app/shared/types/action.types";
import { useActionState } from "react";
import { addCategoryAction } from "../actions/category.action";
import type { Category } from "../types/todo.types";
import CategoryBadge from "./CategoryBadge";

interface CategoryFormProps {
    categories: Category[];
}

// 카테고리 목록 + 새 카테고리 추가 폼
export default function CategoryForm({
    categories,
}: CategoryFormProps): React.JSX.Element {
    const [state, formAction, isPending] = useActionState(
        addCategoryAction,
        INITIAL_ACTION_STATE,
    );

    return (
        <div className="flex flex-col gap-3 px-5 text-base">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl">내 카테고리</span>
                {categories.length === 0 ? (
                    <span className="text-gray-500">
                        아직 카테고리가 없습니다.
                    </span>
                ) : (
                    categories.map((category) => (
                        <CategoryBadge key={category.id} category={category} />
                    ))
                )}
            </div>
            <form action={formAction} className="flex items-center gap-3">
                <input
                    type="text"
                    name="title"
                    aria-label="새 카테고리 이름"
                    placeholder="새 카테고리 이름"
                    maxLength={20}
                    className="border-2 px-4 py-2 rounded-2xl min-w-0 flex-1"
                />
                <input
                    type="color"
                    name="color"
                    aria-label="카테고리 색상"
                    defaultValue="#4f46e5"
                    className="h-11 w-14 cursor-pointer rounded-xl border-2"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white rounded-2xl px-5 py-2 cursor-pointer shrink-0 disabled:opacity-50"
                >
                    {isPending ? "추가 중..." : "추가"}
                </button>
            </form>
            {state.errors?.title && (
                <p className="text-red-500">{state.errors.title}</p>
            )}
            {state.message && (
                <p
                    className={
                        state.success ? "text-green-600" : "text-red-500"
                    }
                >
                    {state.message}
                </p>
            )}
        </div>
    );
}
