"use server";

import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import { ActionState } from "@/app/shared/types/action.types";
import { revalidatePath } from "next/cache";

// 카테고리 추가 (useActionState용)
export async function addCategoryAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "로그인이 필요한 서비스입니다." };
    }

    const title = ((formData.get("title") as string) || "").trim();
    const color = (formData.get("color") as string) || "#000000";

    // 입력값 유효성 검증
    if (!title) {
        return {
            success: false,
            errors: { title: "카테고리 이름을 입력해 주세요." },
        };
    }
    if (title.length > 20) {
        return {
            success: false,
            errors: { title: "카테고리 이름은 20자 이하로 입력해 주세요." },
        };
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("category").insert({
        user_id: user.id,
        title,
        color,
    });

    if (error) {
        return {
            success: false,
            message: `카테고리 추가에 실패했습니다: ${error.message}`,
        };
    }

    revalidatePath("/");

    return { success: true, message: `'${title}' 카테고리가 추가되었습니다.` };
}
