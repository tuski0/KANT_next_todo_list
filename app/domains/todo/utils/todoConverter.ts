import type {
    Category,
    CategoryResponse,
    Todo,
    TodoResponse,
} from "../types/todo.types";

// DB 응답(snake_case) → 화면용 객체(camelCase) 변환
export function toTodo(data: TodoResponse): Todo {
    return {
        id: String(data.id),
        userId: data.user_id,
        title: data.title,
        memo: data.memo ?? "",
        date: data.date ?? "",
        categoryId: data.category_id === null ? null : String(data.category_id),
        isCheck: data.is_check ?? false,
    };
}

export function toCategory(data: CategoryResponse): Category {
    return {
        id: String(data.id),
        title: data.title,
        color: data.color ?? "#000000",
    };
}
