import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import type { Todo, TodoResponse } from "../types/todo.types";
import { toTodo } from "../utils/todoConverter";

// todo_list.id는 uuid 타입이므로 형식이 다르면 DB에 묻지 않고 바로 "없음" 처리
const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 할 일 1건 조회 (내 할 일이 아니거나 없으면 null)
export async function getTodoById(id: string): Promise<Todo | null> {
    // 예: /todo/abc 처럼 잘못된 주소 → 에러 화면이 아니라 not-found 화면으로
    if (!UUID_REGEX.test(id)) return null;

    const user = await getCurrentUser();
    if (!user) return null;

    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("todo_list")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        throw new Error(`할 일을 불러오지 못했습니다: ${error.message}`);
    }

    if (!data) return null;

    return toTodo(data as TodoResponse);
}
