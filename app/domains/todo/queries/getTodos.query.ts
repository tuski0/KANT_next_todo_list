import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import type { Todo, TodoResponse } from "../types/todo.types";
import { toTodo } from "../utils/todoConverter";

// 로그인한 사용자의 할 일 목록 조회 (날짜 오름차순)
export async function getTodos(): Promise<Todo[]> {
    const user = await getCurrentUser();
    if (!user) return [];

    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("todo_list")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true })
        .order("id", { ascending: true });

    // 조회 실패는 에러를 던져서 error.tsx 화면이 보이도록 처리
    if (error) {
        throw new Error(`할 일 목록을 불러오지 못했습니다: ${error.message}`);
    }

    return (data as TodoResponse[]).map((item) => toTodo(item));
}
