import { Suspense } from "react";
import JoinInputForm from "@/app/domains/auth/components/joinInputForm";
export default function Join() {
    return (
        <Suspense fallback={<p>로딩 중...</p>}>
            <JoinInputForm />
        </Suspense>
    );
}
