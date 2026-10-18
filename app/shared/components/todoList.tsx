import SupabaseTest from "@/app/shared/components/supabaseTest";
import { UUID } from "crypto";

interface todoProps {
    id: UUID;
    userId: UUID;
    date: string;
    title: string;
    memo: string;
    isCheck: boolean;
    categoryId: string;
}

export default function TodoList(): React.JSX.Element {
    return (
        <div className="">
            <ul className="grid grid-rows-2 grid-cols-2 gap-y-5 gap-x-5 p-3">
                {SupabaseTest.map((todo) => {
                    return (
                        <TodoListGrid
                            key={todo.id}
                            date={todo.date}
                            title={todo.title}
                            memo={todo.memo}
                            categoryId={todo.category}
                            isCheck={todo.isCheck}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export function TodoListGrid({
    id,
    userId,
    date,
    title,
    memo,
    categoryId,
    isCheck,
}: todoProps): React.JSX.Element {
    return (
        <li className="flex flex-col border-2 text-sm sm:text-xl xl:text-2xl justify-between ">
            <div className="flex flex-col p-3 gap-y-6">
                <div className="flex justify-between">
                    <div className="wrap-anywhere">{date}</div>
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            className="h-6 w-6 cursor-pointer"
                            defaultChecked={isCheck}
                        />
                    </div>
                </div>
                <div className="wrap-anywhere">{title}</div>
                <div className="wrap-anywhere">{memo}</div>
                <div className="wrap-anywhere">{categoryId}</div>
            </div>
            <div className="flex gap-5 p-3">
                <button className="bg-black text-white h-15 w-full rounded-2xl hover:bg-blue-700 cursor-pointer">
                    수정
                </button>
                <button className="bg-black text-white h-15 w-full rounded-2xl hover:bg-red-700 cursor-pointer">
                    삭제
                </button>
            </div>
        </li>
    );
}
