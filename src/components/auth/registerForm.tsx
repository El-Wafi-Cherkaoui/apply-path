'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { RegisterDataAction } from "../../app/actions/auth";
import { User } from "../../../generated/prisma";
import { PhoneInput } from "@/components/ui/phone-input";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { $ZodIssue } from "zod/v4/core";
import Link from "next/link";
import ErrorsAlert from "../alert/ErrorsAlert";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function RegisterForm() {
  const [is_sending, start_processing] = useTransition()
  const [errors, setErrors] = useState<$ZodIssue[]>([])
  const [formData, setFormData] = useState({ email: "", password: "", c_password: "", phoneNumber: "" })
  const [phoneNumber, setPhoneNumber] = useState('')
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    if (formData.password != formData.c_password) {
      setErrors([{
        message: "Password doesn't match",
        code: "custom",
        path: ['password'],
        input: undefined
      }])
      return
    }

    start_processing(() => {
      RegisterDataAction(sentFormData)
        .then((res: User | void) => {
          console.log(res)
        })
        .catch((err) => {
          alert(err)
        })
    })
  }


return (
  <div className={cn("flex flex-col gap-6")} >
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="form">
          <div className="grid gap-6 ">
            <div className="flex flex-col gap-1">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="grid gap-2">
              <div>
                <Label htmlFor="email">Email :</Label>
                <Input disabled={is_sending} required onChange={handleChange} placeholder="example@example.com" name="email" id="email" type="email" />
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
                <Input disabled={is_sending} required placeholder="enter your password" onChange={handleChange} name="password" id="password" type="password" />
              </div>
              <div>
                <Label htmlFor="c_password">Confirm Password :</Label>
                <Input disabled={is_sending} required placeholder="confirm your password" onChange={handleChange} name="c_password" id="c_password" type="password" />
              </div>
              <Button disabled={is_sending} variant="default" className="my-1">Register</Button>

            </div>
            <div className="">
              <p className="text-center text-sm">
                Alread you have an Account ?
                <Link href="/login" className="underline underline-offset-4 p-1">Login</Link>
              </p>
              <ErrorsAlert errors={errors} />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
)
}
