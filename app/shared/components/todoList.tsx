import { todoData } from "./test";

interface todoProps {
    date: string,
    title: string,
    memo: string,
    category: string,
    isCheck: boolean,
}

export default function TodoList(): React.JSX.Element {
    return (
        <div className="">
            <ul className="grid grid-rows-2 grid-cols-2 gap-y-5 gap-x-5 p-3">
                {todoData.map((todo) => {
                    return (
                        <TodoListGrid
                            key={todo.id}
                            date={todo.date}
                            title={todo.title}
                            memo={todo.memo}
                            category={todo.category}
                            isCheck={todo.isCheck}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export function TodoListGrid({date, title, memo, category, isCheck }: todoProps): React.JSX.Element {
    return (
        <li className="flex flex-col border-2 text-sm sm:text-xl xl:text-2xl">
                <div className="flex flex-col gap-y-5 p-3">
                    <div className="flex justify-between">
                        <div className="wrap-anywhere">{date}</div>
                        <div className="flex items-center justify-center">
                            <input type="checkbox" className="h-6 w-6 cursor-pointer" defaultChecked={isCheck} />
                        </div>
                    </div>
                    <div className="wrap-anywhere">{title}</div>
                    <div className="wrap-anywhere">{memo}</div>
                    <div className="wrap-anywhere">{category}</div>
            </div>
            <div className="flex gap-5 p-3">
                <button className="bg-black text-white h-15 w-full rounded-2xl hover:bg-blue-700 cursor-pointer">수정</button>
                <button className="bg-black text-white h-15 w-full rounded-2xl hover:bg-red-700 cursor-pointer">삭제</button>
            </div>
        </li>
    );
}
