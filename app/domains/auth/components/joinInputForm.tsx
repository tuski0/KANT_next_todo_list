"use client";

import { INITIAL_ACTION_STATE } from "@/app/shared/types/action.types";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { signUpAction } from "../actions/signup.action";
import { useRouter, useSearchParams } from "next/navigation";

interface FormType {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
}

const initialForm: FormType = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
};

export default function JoinInputForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl") || "/";

    const [state, formAction, isPending] = useActionState(
        signUpAction,
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
                action={formAction}
                className="flex flex-col text-xl min-h-50 justify-center items-center"
            >
                <div className="flex flex-col gap-x-10 gap-y-10 justify-center py-10">
                    <div className="flex items-center justify-center text-5xl">
                        <h1>JOIN</h1>
                    </div>
                    <div className="flex flex-col justify-center gap-y-6 ">
                        <div className="flex flex-col gap-y-1">
                            <label
                                className="text-black text-xl ml-2"
                                htmlFor="email"
                            >
                                이메일
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="bg-black text-white p-3 rounded-xl"
                                placeholder="email"
                                value={form.email}
                                onChange={onChange}
                                id="email"
                            />
                        </div>
                        {state.errors?.email && (
                            <div className="mb-4">{state.errors.email}</div>
                        )}
                        <div className="flex flex-col gap-y-1">
                            <label
                                className="text-black text-xl ml-2"
                                htmlFor="name"
                            >
                                이름
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-black text-white p-3 rounded-xl"
                                placeholder="name"
                                value={form.name}
                                onChange={onChange}
                            />
                        </div>
                        {state.errors?.name && (
                            <div className="mb-4">{state.errors.name}</div>
                        )}
                        <div className="flex flex-col gap-y-1">
                            <label
                                className="text-black text-xl ml-2"
                                htmlFor="password"
                            >
                                비밀번호
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="bg-black text-white p-3 rounded-xl"
                                id="password"
                            />
                        </div>
                        {state.errors?.password && (
                            <div className="mb-4">{state.errors.password}</div>
                        )}
                        <div className="flex flex-col gap-y-1">
                            <label
                                className="text-black text-xl ml-2"
                                htmlFor="passwordConfirm"
                            >
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                className="bg-black text-white p-3 rounded-xl"
                            />
                        </div>
                        {state.errors?.passwordConfirm && (
                            <div className="mb-4">
                                {state.errors.passwordConfirm}
                            </div>
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
                    <div className="flex items-center">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-black text-white cursor-pointer h-20 w-100 rounded-xl disabled:opacity-50"
                        >
                            {isPending ? "가입 중..." : "JOIN"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
