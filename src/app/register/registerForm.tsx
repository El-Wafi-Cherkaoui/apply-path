'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RegisterDataAction } from "../actions/actions";
import { User } from "../../../generated/prisma";
import { PhoneInput } from "@/components/ui/phone-input";
import {z} from "zod"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { $ZodIssue } from "zod/v4/core";

const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  phoneNumber: z.string().length(13, { message: 'Invalid phone number' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Password Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password Must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password Must contain at least one symbol" }),
})

export default function RegisterForm() {
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
        if(formData.password != formData.c_password){
            alert("Password do not match !")
            return
        }
        const sentFormData = new FormData(e.currentTarget)
        sentFormData.set('phoneNumber', phoneNumber)

        const rawData = Object.fromEntries(sentFormData.entries())
        console.log(rawData);
        
        const result = RegisterSchema.safeParse(rawData)
    
        if (!result.success) {
            console.log(result.error.issues);
            setErrors(result.error.issues)
            return
            // throw new Error(
            //     result.error.issues.map((i) => `${i.path[0]}: ${i.message}`).join("\n")
            // )
        }
        RegisterDataAction(sentFormData)
        .then((res: User)=>{
            console.log(res)
        })
        .catch((err)=>{
            alert(err)
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
                    <Input required onChange={handleChange} placeholder="example@example.com" name="email" id="email" type="email"/>
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
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password :</Label>
                    <Input required placeholder="enter your password" onChange={handleChange} name="password" id="password" type="password"/>
                </div>
                <div>
                    <Label htmlFor="c_password">Confirm Password :</Label>
                    <Input required placeholder="confirm your password" onChange={handleChange} name="c_password" id="c_password" type="password"/>
                </div>
                <Button variant="default" className="my-1">Register</Button>
            </form>
            <p className="text-center p-2">
                Have already an Account ? 
                <a href="#" className="text-blue-500 px-2">Log in</a>
            </p>
            {
                [...errors].reverse().map((err, index)=>{
                    return(
                        <Alert key={index} variant="destructive" className={`absolute right-5 w-fit animate-in fade-in duration-1000`} style={{ bottom: `${index*8 + 5}vh` }}>
                            <AlertTitle>{err.message}</AlertTitle>
                        </Alert>
                    )
                })
            }
        </div>
    );
}