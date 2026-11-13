"use client";

import type { ActionState } from "@/app/shared/types/action.types";
import { useActionState } from "react";
import { addTodoAction } from "../actions/todo.action";
import type { Category, TodoFormValues } from "../types/todo.types";
import CategoryOptions from "./CategoryOptions";

const initialState: ActionState<TodoFormValues> = { success: false };

interface TodoInputFormProps {
    categories: Category[];
}

export default function TodoInputForm({
    categories,
}: TodoInputFormProps): React.JSX.Element {
    const [state, formAction, isPending] = useActionState(
        addTodoAction,
        initialState,
    );

    // 실패하면 서버가 돌려준 입력값으로 다시 채움 (성공하면 빈 값)
    const values = state.success ? undefined : state.data;

    return (
        <div className="min-w-0">
            <form
                action={formAction}
                className="flex w-full min-w-0 flex-col gap-6 py-10 text-sm sm:text-xl xl:text-2xl sm:flex-row sm:items-center "
            >
                <ul className="flex flex-col gap-y-5 px-5 min-w-0 flex-1">
                    <li className="flex gap-x-10 h-15 min-h-20 min-w-0 w-full flex-1">
                        <label
                            htmlFor="date"
                            className="flex items-center justify-center bg-black text-white rounded-2xl w-25"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            defaultValue={values?.date}
                            className="border-2 px-5 rounded-2xl w-full flex-1 "
                        />
                    </li>
                    {state.errors?.date && (
                        <li className="text-red-500 text-base px-2">
                            {state.errors.date}
                        </li>
                    )}
                    <li className="flex gap-x-10 h-15 min-h-20 min-w-0 w-full flex-1">
                        <label
                            htmlFor="title"
                            className="flex items-center justify-center bg-black text-white rounded-2xl w-25"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={values?.title}
                            className="border-2 px-5 rounded-2xl w-full flex-1"
                            placeholder="제목"
                            maxLength={40}
                        />
                    </li>
                    {state.errors?.title && (
                        <li className="text-red-500 text-base px-2">
                            {state.errors.title}
                        </li>
                    )}
                    <li className="flex gap-x-10 h-15 min-h-20 ">
                        <label
                            htmlFor="memo"
                            className="flex items-center justify-center bg-black text-white rounded-2xl w-25"
                        >
                            Memo
                        </label>
                        <input
                            type="text"
                            name="memo"
                            id="memo"
                            defaultValue={values?.memo}
                            className="border-2 px-5 rounded-2xl w-full flex-1"
                            placeholder="메모"
                            maxLength={40}
                        />
                    </li>
                    {state.errors?.memo && (
                        <li className="text-red-500 text-base px-2">
                            {state.errors.memo}
                        </li>
                    )}
                    <li className="flex gap-x-10 h-15 min-h-20 ">
                        <label
                            htmlFor="categoryId"
                            className="flex items-center justify-center bg-black text-white rounded-2xl w-25 "
                        >
                            Category
                        </label>
                        {/* select는 defaultValue가 바뀌어도 다시 반영되지 않으므로 key로 새로 그리기 */}
                        <select
                            key={values?.categoryId ?? ""}
                            name="categoryId"
                            id="categoryId"
                            defaultValue={values?.categoryId ?? ""}
                            className="border-2 px-5 rounded-2xl cursor-pointer min-w-0 w-full flex-1"
                        >
                            <CategoryOptions categories={categories} />
                        </select>
                    </li>
                    {/* 서버 처리 결과 메시지 */}
                    {state.message && (
                        <li
                            className={`text-base px-2 ${state.success ? "text-green-600" : "text-red-500"}`}
                        >
                            {state.message}
                        </li>
                    )}
                </ul>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white min-w-40 min-h-40 rounded-2xl cursor-pointer disabled:opacity-50"
                >
                    {isPending ? "등록 중..." : "제출"}
                </button>
            </form>
        </div>
    );
}
