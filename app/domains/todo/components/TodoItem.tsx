import Link from "next/link";
import type { Category, Todo } from "../types/todo.types";
import CategoryBadge from "./CategoryBadge";

interface TodoItemProps {
    item: Todo;
    category?: Category;
    onToggle: (id: string, isCheck: boolean) => void;
    onDelete: (id: string) => void;
}

// 할 일 한 줄 (부모 TodoList에서 데이터와 이벤트 함수를 Props로 전달받음)
export default function TodoItem({
    item,
    category,
    onToggle,
    onDelete,
}: TodoItemProps): React.JSX.Element {
    const { id, title, memo, date, isCheck } = item;

    return (
        <li className="flex items-center gap-4 border-2 rounded-2xl p-4">
            <input
                type="checkbox"
                aria-label={`${title} 완료`}
                className="w-6 h-6 cursor-pointer shrink-0"
                checked={isCheck}
                onChange={() => onToggle(id, !isCheck)}
            />
            <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0">
                    <CategoryBadge category={category} />
                    <Link
                        href={`/todo/${id}`}
                        className={`text-xl truncate hover:underline ${isCheck ? "line-through text-gray-400" : ""}`}
                    >
                        {title}
                    </Link>
                </div>
                <div className="flex gap-3 text-sm text-gray-500 min-w-0">
                    <span className="shrink-0">{date}</span>
                    {memo && <span className="truncate">{memo}</span>}
                </div>
            </div>
            <button
                type="button"
                className="bg-black text-white rounded-xl px-4 py-2 cursor-pointer shrink-0"
                onClick={() => onDelete(id)}
            >
                삭제
            </button>
        </li>
    );
}
