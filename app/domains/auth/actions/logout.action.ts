"use server";

import { createServerClient } from "@/app/shared/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function LogoutAction() {
    const supabase = createServerClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
}
