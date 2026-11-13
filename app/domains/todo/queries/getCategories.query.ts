import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import type { Category, CategoryResponse } from "../types/todo.types";
import { toCategory } from "../utils/todoConverter";

// 로그인한 사용자의 카테고리 목록 조회
export async function getCategories(): Promise<Category[]> {
    const user = await getCurrentUser();
    if (!user) return [];

    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("category")
        .select("id, title, color")
        .eq("user_id", user.id)
        .order("id", { ascending: true });

    if (error) {
        throw new Error(`카테고리를 불러오지 못했습니다: ${error.message}`);
    }

    return (data as CategoryResponse[]).map((item) => toCategory(item));
}
