"use client";

import type { ActionState } from "@/app/shared/types/action.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useTransition } from "react";
import {
    deleteTodoAction,
    toggleTodoAction,
    updateTodoAction,
} from "../actions/todo.action";
import type { Category, Todo, TodoFormValues } from "../types/todo.types";
import CategoryBadge from "./CategoryBadge";
import CategoryOptions from "./CategoryOptions";

const initialState: ActionState<TodoFormValues> = { success: false };

interface TodoDetailsProps {
    todo: Todo;
    categories: Category[];
}

export default function TodoDetails({
    todo,
    categories,
}: TodoDetailsProps): React.JSX.Element {
    const router = useRouter();
    const [state, formAction, isSaving] = useActionState(
        updateTodoAction,
        initialState,
    );

    // 수정 실패 시에는 방금 입력한 값, 아니면 저장된 값으로 폼 채우기
    const values: TodoFormValues =
        !state.success && state.data
            ? state.data
            : {
                  date: todo.date,
                  title: todo.title,
                  memo: todo.memo,
                  categoryId: todo.categoryId ?? "",
              };
    const [isPending, startTransition] = useTransition();

    const category = categories.find((c) => c.id === todo.categoryId);

    const onToggle = () => {
        startTransition(async () => {
            await toggleTodoAction(todo.id, !todo.isCheck);
        });
    };

    const onDelete = () => {
        if (!confirm("이 할 일을 삭제할까요?")) return;

        startTransition(async () => {
            await deleteTodoAction(todo.id);
            router.push("/");
        });
    };

    return (
        <section className="flex flex-col gap-8 w-full max-w-2xl text-xl">
            <div className="flex items-center justify-between">
                <Link href="/" className="underline">
                    ← 목록으로
                </Link>
                <span className={todo.isCheck ? "text-green-600" : ""}>
                    {todo.isCheck ? "완료" : "진행 중"}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <CategoryBadge category={category} />
                <h1
                    className={`text-4xl ${todo.isCheck ? "line-through text-gray-400" : ""}`}
                >
                    {todo.title}
                </h1>
            </div>

            {/* 수정 폼: key를 바꿔서 저장 후 새 값으로 다시 그리기 */}
            <form
                key={`${todo.title}_${todo.memo}_${todo.date}_${todo.categoryId}`}
                action={formAction}
                className="flex flex-col gap-4 border-2 rounded-2xl p-6"
            >
                <input type="hidden" name="id" value={todo.id} />
                <label className="flex flex-col gap-1">
                    날짜
                    <input
                        type="date"
                        name="date"
                        defaultValue={values.date}
                        className="border-2 px-4 py-2 rounded-xl"
                    />
                </label>
                {state.errors?.date && (
                    <p className="text-red-500 text-base">
                        {state.errors.date}
                    </p>
                )}
                <label className="flex flex-col gap-1">
                    제목
                    <input
                        type="text"
                        name="title"
                        defaultValue={values.title}
                        maxLength={40}
                        className="border-2 px-4 py-2 rounded-xl"
                    />
                </label>
                {state.errors?.title && (
                    <p className="text-red-500 text-base">
                        {state.errors.title}
                    </p>
                )}
                <label className="flex flex-col gap-1">
                    메모
                    <input
                        type="text"
                        name="memo"
                        defaultValue={values.memo}
                        maxLength={40}
                        className="border-2 px-4 py-2 rounded-xl"
                    />
                </label>
                {state.errors?.memo && (
                    <p className="text-red-500 text-base">
                        {state.errors.memo}
                    </p>
                )}
                <label className="flex flex-col gap-1">
                    카테고리
                    {/* select는 defaultValue가 바뀌어도 다시 반영되지 않으므로 key로 새로 그리기 */}
                    <select
                        key={values.categoryId}
                        name="categoryId"
                        defaultValue={values.categoryId}
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer"
                    >
                        <CategoryOptions categories={categories} />
                    </select>
                </label>
                {state.message && (
                    <p
                        className={`text-base ${state.success ? "text-green-600" : "text-red-500"}`}
                    >
                        {state.message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-black text-white rounded-xl py-3 cursor-pointer disabled:opacity-50"
                >
                    {isSaving ? "저장 중..." : "저장"}
                </button>
            </form>

            <div className="flex gap-4">
                <button
                    type="button"
                    disabled={isPending}
                    onClick={onToggle}
                    className="flex-1 border-2 border-black rounded-xl py-3 cursor-pointer disabled:opacity-50"
                >
                    {todo.isCheck ? "미완료로 되돌리기" : "완료하기"}
                </button>
                <button
                    type="button"
                    disabled={isPending}
                    onClick={onDelete}
                    className="flex-1 bg-red-500 text-white rounded-xl py-3 cursor-pointer disabled:opacity-50"
                >
                    삭제
                </button>
            </div>
        </section>
    );
}
