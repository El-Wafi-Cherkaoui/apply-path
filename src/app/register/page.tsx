import { Metadata } from "next";
import RegisterForm from "./registerForm";
export const metadata: Metadata = {
  title: "Register",
};
export default function RegisterPage() {
    
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <RegisterForm/>
        </div>
    );
}