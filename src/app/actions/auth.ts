"use server"

import { signIn } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getUserByEmail } from "@/lib/user/getUserByEmail"
import { loginRedirect } from "@/routes"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function RegisterDataAction(formData : FormData) {
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const phone =  formData.get("phoneNumber")?.toString() ?? ""
    const new_user = await prisma.user.create({
        data : {
            email,
            password : await bcrypt.hash(password, 10),
            phone
        },
    })
    if(new_user){
        redirect("/login")
    }
}

export async function LoginDataAction(formData : FormData) {
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""

    const user = await getUserByEmail(email)
    if(!user || !user.password || !password) {
        throw new Error("wrong credentials")
    }

    const pwd_is_correct = await bcrypt.compare(password, user.password)
    if(pwd_is_correct){
        return await signIn("credentials", {email, password, redirectTo: loginRedirect})
    }
    throw new Error("wrong credentials");
    
}