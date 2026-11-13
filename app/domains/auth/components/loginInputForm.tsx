"use client";

import { INITIAL_ACTION_STATE } from "@/app/shared/types/action.types";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { signInAction } from "../actions/login.action";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface FormType {
    email: string;
    password: string;
}

const initialForm: FormType = {
    email: "",
    password: "",
};

export default function LoginInputForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl") || "/";

    const [state, formAction, isPending] = useActionState(
        signInAction,
        INITIAL_ACTION_STATE,
    );

    const [form, setForm] = useState(initialForm);
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    useEffect(() => {
        // 성공 시 이동만 처리
        // (서버 액션의 revalidatePath로 캐시가 갱신되므로 router.refresh()는 호출하지 않음.
        //  push 직후 refresh를 부르면 아직 현재 페이지에 있는 상태로 새로고침되어 이동이 취소될 수 있음)
        // replace: 뒤로 가기로 로그인·회원가입 폼에 다시 돌아오지 않도록
        if (state.success) {
            router.replace(redirectUrl);
        }
    }, [state.success, redirectUrl, router]);

    return (
        <div className="flex justify-center">
            <form
                className="flex flex-col text-xl min-h-50 justify-center items-center"
                action={formAction}
            >
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
                                placeholder="email"
                                value={form.email}
                                onChange={onChange}
                            />
                        </div>
                        {state.errors?.email && (
                            <div className="mb-4">{state.errors.email}</div>
                        )}
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
                        {state.errors?.password && (
                            <div className="mb-4">{state.errors.password}</div>
                        )}
                    </div>
                    {/* 서버 처리 결과 메시지 (성공: 이동 전까지 안내, 실패: 사유) */}
                    {state.message && (
                        <p
                            className={`text-center ${state.success ? "text-green-600" : "text-red-500"}`}
                        >
                            {state.success
                                ? `${state.message} 잠시 후 이동합니다...`
                                : state.message}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-black text-white cursor-pointer h-20 w-40 rounded-xl disabled:opacity-50"
                        >
                            {isPending ? "로그인 중..." : "LOGIN"}
                        </button>
                        <Link
                            href="/join"
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
