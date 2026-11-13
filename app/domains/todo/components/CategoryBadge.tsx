import type { Category } from "../types/todo.types";

interface CategoryBadgeProps {
    category?: Category;
}

// 카테고리 이름을 카테고리 색으로 표시 (카테고리가 없으면 표시 안 함)
export default function CategoryBadge({
    category,
}: CategoryBadgeProps): React.JSX.Element | null {
    if (!category) return null;

    return (
        <span
            className="text-white text-sm rounded-xl px-3 py-1 shrink-0"
            style={{ backgroundColor: category.color }}
        >
            {category.title}
        </span>
    );
}
