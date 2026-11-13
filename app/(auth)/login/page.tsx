import { Suspense } from "react";
import LoginInputForm from "@/app/domains/auth/components/loginInputForm";
export default function Login() {
    return (
        <Suspense fallback={<p>로딩 중...</p>}>
            <LoginInputForm />
        </Suspense>
    );
}
