'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState, useTransition } from "react";
import { LoginDataAction, RegisterDataAction } from "../../app/actions/auth";
import { User } from "../../../generated/prisma";
import { PhoneInput } from "@/components/ui/phone-input";
import {z} from "zod"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { $ZodIssue } from "zod/v4/core";
import Link from "next/link";
import ErrorsAlert from "../alert/ErrorsAlert";

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Password Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password Must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password Must contain at least one symbol" }),
})

export default function LoginForm() {
    const [errors, setErrors] = useState<$ZodIssue[]>([])
    const [is_sending, startProcessing] = useTransition()
    const email_ref = useRef("")
    const pwd_ref = useRef("")
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(!email_ref.current.valueOf || !pwd_ref.current.valueOf || is_sending){
            alert("can't leave fields empty !")
            return
        }
        const sentFormData = new FormData(e.currentTarget)
        const rawData = Object.fromEntries(sentFormData.entries())
        
        const result = LoginSchema.safeParse(rawData)
    
        if (!result.success) {
            console.log(result.error.issues);
            setErrors(result.error.issues)
            return
        }
        startProcessing(()=>{
            LoginDataAction(sentFormData)
            .then((res: User)=>{
                console.log(res)
            })
            .catch((err)=>{
                setErrors([err])
            })
        })
    }
    return (
        <div className="border-1 w-[50vw] shadow-2xl rounded-2xl">
            <h1 className="text-2xl text-center p-4 bg-primary text-secondary rounded-t-2xl">
                Log in
            </h1>
            <form onSubmit={handleSubmit} className="register-form p-4 pb-0">
                <div>
                    <Label htmlFor="email">Email :</Label>
                    <Input disabled={is_sending} required placeholder="example@example.com" name="email" id="email" type="email"/>
                </div>
                <div>
                    <Label htmlFor="password">Password :</Label>
                    <Input disabled={is_sending} required placeholder="enter your password" name="password" id="password" type="password"/>
                </div>
                <Button disabled={is_sending} variant="default" className="my-1">Login</Button>
            </form>
            <p className="text-center p-2">
                You don't have an Account ? 
                <Link href="/register" className="text-blue-500 px-2">Register</Link>
            </p>
            <ErrorsAlert errors={errors}/>
        </div>
    );
}