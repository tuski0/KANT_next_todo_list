import { createServerClient } from "@/app/shared/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { connection } from "next/server";

// 현재 로그인한 사용자 조회 (없으면 null)
export async function getCurrentUser(): Promise<User | null> {
    // 요청 시점에 실행되도록 선언 (Supabase 내부의 Date.now()가 프리렌더링 중에 실행되지 않게)
    // ※ 반드시 Suspense 안쪽 컴포넌트에서 호출할 것
    await connection();

    const supabase = createServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}
