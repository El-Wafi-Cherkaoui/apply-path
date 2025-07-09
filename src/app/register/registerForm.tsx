'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RegisterDataAction } from "../actions/actions";
import { User } from "../../../generated/prisma";
import { PhoneInput } from "@/components/ui/phone-input";
export default function RegisterForm() {
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
        RegisterDataAction(sentFormData)
        .then((res: User)=>{
            console.log(res)
        })
        .catch((err)=>{
            alert(err)
        })
    }
    return (
        <div className="border-1 p-4 w-[50vw] shadow-2xl rounded-2xl">
            <h1 className="text-2xl text-center p-4">
                Get Started !
            </h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <Label htmlFor="email">Email :</Label>
                    <Input onChange={handleChange} placeholder="example@example.com" name="email" id="email" type="email"/>
                </div>
                <div>
                    <Label htmlFor="phoneNumber">Phone :</Label>
                    <PhoneInput 
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
                    <Input placeholder="enter your password" onChange={handleChange} name="password" id="password" type="password"/>
                </div>
                <div>
                    <Label htmlFor="password">Confirm Password :</Label>
                    <Input placeholder="confirm your password" onChange={handleChange} name="c_password" id="c_password" type="password"/>
                </div>
                <Button variant="default" className="my-1">Register</Button>
            </form>
            <p className="text-center pt-2 ">
                Have already an Account ? 
                <a href="#" className="text-blue-500 px-2">Log in</a>
            </p>
        </div>
    );
}