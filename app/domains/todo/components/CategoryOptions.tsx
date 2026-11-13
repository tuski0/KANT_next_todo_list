import type { Category } from "../types/todo.types";

interface CategoryOptionsProps {
    categories: Category[];
}

// <select> 안에 들어갈 카테고리 옵션 목록 (등록 폼·수정 폼 공통)
export default function CategoryOptions({
    categories,
}: CategoryOptionsProps): React.JSX.Element {
    return (
        <>
            <option value="">카테고리 없음</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.title}
                </option>
            ))}
        </>
    );
}
