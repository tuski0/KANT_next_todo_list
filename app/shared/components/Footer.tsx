export default function Footer() {
    return (
        <footer className="flex flex-col w-full min-h-30 bg-black text-white justify-center gap-y-10 px-10 text-xl">
            <div>KANT Todo List ★ 오늘 할 일을 하나씩 ★</div>
            <div className="flex justify-between">
                <div>© KANT_AX_1 All rights reserved.</div>
                <div>
                    <a href="https://github.com/tuski0/KANT_next_todo_list">
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
