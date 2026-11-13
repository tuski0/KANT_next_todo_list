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
        if (state.success) {
            router.push(redirectUrl);
            router.refresh();
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
                    {/* 서버 처리 결과 메시지 (실패 시) */}
                    {state.message && !state.success && (
                        <p className="text-red-500 text-center">
                            {state.message}
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
