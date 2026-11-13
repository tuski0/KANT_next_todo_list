import type { TodoInput } from "../types/todo.types";

export function validateTodoInput(input: TodoInput): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!input.date) {
        errors.date = "날짜를 선택해 주세요.";
    }

    if (!input.title || !input.title.trim()) {
        errors.title = "할 일 제목을 입력해 주세요.";
    } else if (input.title.trim().length > 40) {
        errors.title = "제목은 40자 이하로 입력해 주세요.";
    }

    if (input.memo.trim().length > 40) {
        errors.memo = "메모는 40자 이하로 입력해 주세요.";
    }

    return errors;
}
