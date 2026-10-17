export default function InputForm() {
    return (
        <form className="flex flex-row w-full min-h-60 text-xl items-center justify-center py-10">
            <ul className="flex flex-col gap-y-5 px-5">
                <li className="flex gap-x-10 h-15">
                    <span 
                        className="flex items-center justify-center w-30 bg-indigo-100 rounded-2xl">
                        Date
                    </span>
                    <input type="date" className="border-2 px-5 w-100 rounded-2xl"/>
                </li>
                <li className="flex gap-x-10 h-15">
                    <span
                        className="flex items-center justify-center w-30 bg-indigo-100 rounded-2xl">
                        Title
                    </span>
                    <input type="text" className="border-2 px-5 w-100 rounded-2xl" placeholder="Title"/>
                </li>
                <li className="flex gap-x-10 h-15">
                    <span
                        className="flex items-center justify-center w-30 bg-indigo-100 rounded-2xl">
                        Memo
                    </span>
                    <input type="textarea" className="border-2 px-5 w-100 rounded-2xl" placeholder="간단한 Memo"/>
                </li>
                <li className="flex gap-x-10 h-15">
                    <span
                         className="flex items-center justify-center w-30 bg-indigo-100 rounded-2xl">
                    Category
                    </span>
                    <select className="border-2 px-5 w-100 rounded-2xl" >
                        <option>업무</option>
                        <option>공부</option>
                        <option>휴식</option>
                    </select>
                </li>
            </ul>
            <button type="submit" 
                className="bg-indigo-100 text-black min-w-40 min-h-40 rounded-2xl">
                제출
            </button>
        </form>
    )
}