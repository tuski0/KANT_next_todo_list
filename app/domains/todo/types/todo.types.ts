// 화면에서 사용하는 할 일 타입 (camelCase)
export interface Todo {
    id: string;
    userId: string;
    title: string;
    memo: string;
    date: string;
    categoryId: string | null;
    isCheck: boolean;
}

// Supabase todo_list 테이블에서 내려오는 원본 데이터 (snake_case)
export interface TodoResponse {
    id: number | string;
    user_id: string;
    title: string;
    memo: string | null;
    date: string | null;
    category_id: number | string | null;
    is_check: boolean | null;
}

// 할 일 등록·수정 폼 입력값
export interface TodoInput {
    title: string;
    memo: string;
    date: string;
}

// 실패 시 폼에 다시 채워 줄 입력값 (ActionState의 data로 반환)
export interface TodoFormValues extends TodoInput {
    categoryId: string;
}

// 카테고리 (category 테이블)
export interface Category {
    id: string;
    title: string;
    color: string;
}

export interface CategoryResponse {
    id: number | string;
    title: string;
    color: string | null;
}
