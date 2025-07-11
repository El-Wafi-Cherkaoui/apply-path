import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./lib/user/getUserByEmail"
import bcrypt from "bcryptjs"
import { LoginSchema } from "./lib/schemas/LoginSchema"
 
export default {
  providers: [
    Credentials({
      async authorize(credentials){
        const validatedFields = LoginSchema.safeParse(credentials)
        if(validatedFields.success){
          const {email, password} = validatedFields.data
          const user = await getUserByEmail(email)
          if(!user || !user.password) return null
  
          const isCorrectPwd = await bcrypt.compare(password, user.password)
          if(isCorrectPwd) return {email : user.email, phone: user.phone}
        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig