"use server"

import { prisma } from "@/lib/prisma"

export async function RegisterDataAction(formData : FormData) {
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const phone =  formData.get("phoneNumber")?.toString() ?? ""
    const new_user = await prisma.user.create({
        data : {
            email,
            password,
            phone
        },
    })
    return new_user


}