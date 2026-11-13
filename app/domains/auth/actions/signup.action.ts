"use server";

import { createServerClient } from "@/app/shared/lib/supabase";
import { ActionState } from "@/app/shared/types/action.types";
import { revalidatePath } from "next/cache";
import { validateSignUpInput } from "../utils/authValidation";

export async function signUpAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const email = (formData.get("email") as string) || "";
    const name = (formData.get("name") as string) || "";
    const password = (formData.get("password") as string) || "";
    const passwordConfirm = (formData.get("passwordConfirm") as string) || "";

    // 입력값 유효성 검증
    const errors = validateSignUpInput({
        email,
        name,
        password,
        passwordConfirm,
    });
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    const supabase = createServerClient();

    // Supabase 이메일/비밀번호 회원가입 요청
    const { data: authData, error: signUperror } = await supabase.auth.signUp({
        email: email.trim(),
        password,
    });

    if (signUperror || !authData.user) {
        // 이미 가입된 이메일인 경우 별도 안내
        const isRegistered =
            signUperror?.message.includes("already registered") ?? false;
        return {
            success: false,
            message: isRegistered
                ? "이미 가입된 이메일입니다."
                : `회원가입에 실패했습니다: ${signUperror?.message ?? "알 수 없는 오류"}`,
        };
    }

    const { error: insertError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        name: name.trim(),
        email: email.trim(),
    });

    if (insertError) {
        return {
            success: false,
            message: `프로필 생성에 실패했습니다: ${insertError.message}`,
        };
    }

    revalidatePath("/", "layout");

    return {
        success: true,
        message: "회원가입이 완료되었습니다.",
    };
}
