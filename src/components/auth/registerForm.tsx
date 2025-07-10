'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { RegisterDataAction } from "../../app/actions/auth";
import { User } from "../../../generated/prisma";
import { PhoneInput } from "@/components/ui/phone-input";
import {z} from "zod"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { $ZodIssue } from "zod/v4/core";
import Link from "next/link";
import ErrorsAlert from "../alert/ErrorsAlert";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";

export default function RegisterForm() {
    const [is_sending, start_processing] = useTransition()
    const [errors, setErrors] = useState<$ZodIssue[]>([])
    const [formData, setFormData] = useState({email: "", password : "", c_password : "", phoneNumber: ""})
    const [phoneNumber, setPhoneNumber] = useState('')
    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const sentFormData = new FormData(e.currentTarget)
        sentFormData.set('phoneNumber', phoneNumber)

        const rawData = Object.fromEntries(sentFormData.entries())
        console.log(rawData);
        
        const result = RegisterSchema.safeParse(rawData)
    
        if (!result.success) {
            console.log(result.error.issues);
            setErrors(result.error.issues)
            return
        }
        if(formData.password != formData.c_password){
            setErrors([{
            message: "Password doesn't match",
            code: "custom",
            path: ['password'], 
            input: undefined
            }])   
            return
        }

        start_processing(()=>{
            RegisterDataAction(sentFormData)
            .then((res: User | void)=>{
                console.log(res)
            })
            .catch((err)=>{
                alert(err)
            })
        })
    }
    return (
        <div className="border-1 w-[50vw] shadow-2xl rounded-2xl">
            <h1 className="text-2xl text-center p-4 bg-primary text-secondary rounded-t-2xl">
                Get Started !
            </h1>
            <form onSubmit={handleSubmit} className="register-form p-4 pb-0">
                <div>
                    <Label htmlFor="email">Email :</Label>
                    <Input disabled={is_sending} required onChange={handleChange} placeholder="example@example.com" name="email" id="email" type="email"/>
                </div>
                <div>
                    <Label htmlFor="phoneNumber">Phone :</Label>
                    <PhoneInput 
                        required
                        onChange={setPhoneNumber} 
                        value={phoneNumber} 
                        defaultCountry="MA" 
                        name="phoneNumber" 
                        id="phoneNumber" 
                        className="col-span-5" 
                        disabled={is_sending}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password :</Label>
                    <Input disabled={is_sending} required placeholder="enter your password" onChange={handleChange} name="password" id="password" type="password"/>
                </div>
                <div>
                    <Label htmlFor="c_password">Confirm Password :</Label>
                    <Input disabled={is_sending} required placeholder="confirm your password" onChange={handleChange} name="c_password" id="c_password" type="password"/>
                </div>
                <Button disabled={is_sending} variant="default" className="my-1">Register</Button>
            </form>
            <p className="text-center p-2">
                Have already an Account ? 
                <Link href="/login" className="text-blue-500 px-2">Log in</Link>
            </p>
            <ErrorsAlert errors={errors}/>
        </div>
    );
}