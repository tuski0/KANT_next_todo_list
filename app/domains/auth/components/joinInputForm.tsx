"use client";

import Link from "next/link";
import { INITIAL_ACTION_STATE } from "@/app/shared/types/action.types";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { signInAction } from "../actions/login.action";
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
        signInAction,
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
                            <span className="h-15 w-20 bg-black text-white flex items-center justify-center rounded-xl">
                                이름
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="bg-black text-white p-3 rounded-xl"
                                placeholder="name"
                                value={form.name}
                                onChange={onChange}
                            />
                        </div>
                        {state.errors?.name && (
                            <div className="mb-4">{state.errors.name}</div>
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
                        <div className="flex justify-between gap-x-10">
                            <span className="h-15 w-20 bg-black text-white flex items-center justify-center rounded-2xl">
                                비밀번호 확인
                            </span>
                            <input
                                type="password"
                                name="passwordConfirm"
                                className="bg-black text-white p-3 rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black text-white cursor-pointer h-20 w-40 rounded-xl"
                        >
                            LOGIN
                        </button>
                        <Link
                            href="/"
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
