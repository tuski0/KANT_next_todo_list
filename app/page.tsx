import InputForm from "@/app/shared/components/inputForm";
import TodoList from "@/app/shared/components/todoList";

export default function Home() {
    return (
        <div className="grid grid-cols-1 items-start gap-8 px-4 py-10 xl:grid-cols-2">
            <InputForm />
            <TodoList />
        </div>
    );
}
