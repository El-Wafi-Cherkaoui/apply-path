import LoginForm from "@/components/auth/loginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};
export default function LoginPage() {
    
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <LoginForm/>
        </div>
    );
}