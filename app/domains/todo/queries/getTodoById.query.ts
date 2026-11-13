import { getCurrentUser } from "@/app/domains/auth/queries/getCurrentUser.query";
import { createServerClient } from "@/app/shared/lib/supabase";
import type { Todo, TodoResponse } from "../types/todo.types";
import { toTodo } from "../utils/todoConverter";

// 할 일 1건 조회 (내 할 일이 아니거나 없으면 null)
export async function getTodoById(id: string): Promise<Todo | null> {
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
