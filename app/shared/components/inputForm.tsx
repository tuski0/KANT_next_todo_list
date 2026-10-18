interface categoryProps {
    title: string;
    color: string;
}

export default function InputForm(): React.JSX.Element {
    return (
        <div className="min-w-0 self-start xl:sticky xl:top-6">
            <form className="flex w-full min-w-0 flex-col gap-6 py-10 text-sm sm:text-xl xl:text-2xl sm:flex-row sm:items-center ">
                <ul className="flex flex-col gap-y-5 px-5 min-w-0 flex-1">
                    <li className="flex gap-x-10 h-15 min-h-20 min-w-0 w-full flex-1">
                        <span className="flex items-center justify-center bg-black text-white rounded-2xl w-25">
                            Date
                        </span>
                        <input
                            type="date"
                            className="border-2 px-5 rounded-2xl w-full flex-1 "
                        />
                    </li>
                    <li className="flex gap-x-10 h-15 min-h-20 min-w-0 w-full flex-1">
                        <span className="flex items-center justify-center bg-black text-white rounded-2xl w-25">
                            Title
                        </span>
                        <input
                            type="text"
                            className="border-2 px-5 rounded-2xl w-full flex-1"
                            placeholder="제목"
                            maxLength={40}
                        />
                    </li>
                    <li className="flex gap-x-10 h-15 min-h-20 ">
                        <span className="flex items-center justify-center bg-black text-white rounded-2xl w-25">
                            Memo
                        </span>
                        <input
                            type="text"
                            className="border-2 px-5 rounded-2xl w-full flex-1"
                            placeholder="메모"
                            maxLength={40}
                        />
                    </li>
                    <li className="flex gap-x-10 h-15 min-h-20 ">
                        <span className="flex items-center justify-center bg-black text-white rounded-2xl w-25 ">
                            Category
                        </span>
                        <select className="border-2 px-5 rounded-2xl cursor-pointer min-w-0 w-full flex-1">
                            <option>Python</option>
                            <option>JAVA</option>
                            <option>Java Script</option>
                            <option>Next.js</option>
                            <option>React</option>
                        </select>
                    </li>
                </ul>
                <button
                    type="submit"
                    className="bg-black text-white min-w-40 min-h-40 rounded-2xl cursor-pointer"
                >
                    제출
                </button>
            </form>
        </div>
    );
}

export function categoryList({
    title,
    color,
}: categoryProps): React.JSX.Element {
    return <option value={color}>{title}</option>;
}
