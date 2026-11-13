// 할 일 데이터를 불러오는 동안 보여줄 로딩 UI
export default function TodoListSkeleton(): React.JSX.Element {
    return (
        <>
            <div className="flex flex-col gap-5 px-5 py-10">
                {[1, 2, 3, 4].map((n) => (
                    <div
                        key={n}
                        className="h-20 rounded-2xl bg-gray-200 animate-pulse"
                    />
                ))}
            </div>
            <div className="flex flex-col gap-3 px-5 py-10">
                <p className="text-xl text-gray-500">할 일을 불러오는 중...</p>
                {[1, 2, 3].map((n) => (
                    <div
                        key={n}
                        className="h-16 rounded-2xl bg-gray-200 animate-pulse"
                    />
                ))}
            </div>
        </>
    );
}
