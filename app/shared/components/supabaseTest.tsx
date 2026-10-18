import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function TodoListData() {
    const supabase = await createClient();
    const { data: todos, error } = await supabase.from("todo_list").select();

    if (error) {
        return <p>Error Loading todo_list :{error.message}</p>;
    }

    return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}

export default function SupabaseTest() {
    return (
        <Suspense fallback={<div>Loading Supabase Data</div>}>
            <TodoListData />
        </Suspense>
    );
}
