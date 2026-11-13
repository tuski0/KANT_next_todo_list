"use server";

import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import { ActionState } from "@/app/shared/types/action.types";
import { revalidatePath } from "next/cache";
import type { TodoFormValues } from "../types/todo.types";
import { validateTodoInput } from "../utils/todoValidation";

// FormData에서 할 일 입력값 꺼내기 (등록·수정 공통)
function getTodoFormData(formData: FormData): TodoFormValues {
    return {
        date: (formData.get("date") as string) || "",
        title: (formData.get("title") as string) || "",
        memo: (formData.get("memo") as string) || "",
        categoryId: (formData.get("categoryId") as string) || "",
    };
}

// 할 일 등록 (useActionState용)
export async function addTodoAction(
    prevState: ActionState<TodoFormValues>,
    formData: FormData,
): Promise<ActionState<TodoFormValues>> {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "로그인이 필요한 서비스입니다." };
    }

    const values = getTodoFormData(formData);
    const { date, title, memo, categoryId } = values;

    // 입력값 유효성 검증
    const errors = validateTodoInput({ date, title, memo });
    if (Object.keys(errors).length > 0) {
        // 실패 시 입력값을 돌려줘서 폼에 다시 채우기
        return { success: false, errors, data: values };
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("todo_list").insert({
        user_id: user.id,
        date,
        title: title.trim(),
        memo: memo.trim(),
        // 카테고리를 선택하지 않으면 null로 저장
        category_id: categoryId || null,
        is_check: false,
    });

    if (error) {
        return {
            success: false,
            message: `할 일 등록에 실패했습니다: ${error.message}`,
            data: values,
        };
    }

    revalidatePath("/");

    return { success: true, message: "할 일이 등록되었습니다." };
}

// 할 일 수정 (상세 페이지, useActionState용)
export async function updateTodoAction(
    prevState: ActionState<TodoFormValues>,
    formData: FormData,
): Promise<ActionState<TodoFormValues>> {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "로그인이 필요한 서비스입니다." };
    }

    const id = (formData.get("id") as string) || "";
    const values = getTodoFormData(formData);
    const { date, title, memo, categoryId } = values;

    const errors = validateTodoInput({ date, title, memo });
    if (Object.keys(errors).length > 0) {
        // 실패 시 입력값을 돌려줘서 폼에 다시 채우기
        return { success: false, errors, data: values };
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("todo_list")
        .update({
            date,
            title: title.trim(),
            memo: memo.trim(),
            category_id: categoryId || null,
        })
        .eq("id", id)
        .eq("user_id", user.id)
        .select("id")
        .maybeSingle();

    if (error || !data) {
        return {
            success: false,
            message: `할 일 수정에 실패했습니다: ${error?.message ?? "할 일을 찾을 수 없습니다."}`,
            data: values,
        };
    }

    revalidatePath("/");
    revalidatePath(`/todo/${id}`);

    return { success: true, message: "수정되었습니다." };
}

// 완료 여부 변경 (실패 시 에러를 던져서 화면에서 롤백)
export async function toggleTodoAction(
    id: string,
    isCheck: boolean,
): Promise<void> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("로그인이 필요한 서비스입니다.");
    }

    const supabase = createServerClient();
    const { error } = await supabase
        .from("todo_list")
        .update({ is_check: isCheck })
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath(`/todo/${id}`);
}

// 할 일 삭제
export async function deleteTodoAction(id: string): Promise<void> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("로그인이 필요한 서비스입니다.");
    }

    const supabase = createServerClient();
    const { error } = await supabase
        .from("todo_list")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
}
