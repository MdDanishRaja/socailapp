"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthSubmitBtn from './authSubmitBtn'

import { useFormState } from "react-dom"
import { loginAction } from "@/actions/authActions"

const initState={
    status:0,
    errors:{}
};

export default function Login() {
    const [state, formAction] = useFormState(loginAction, initState)
  return (
      <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className='text-center'>
              Welcome back to community.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={formAction}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder='Enter Email here..' name='email' />
              <span className='text-red-500'>{state?.errors?.email}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder='Enter password here..' name='password' />
              <span className='text-red-500'>{state?.errors?.password}</span>
            </div>
            <AuthSubmitBtn text="Submit"/>
            </form>
          </CardContent>
        </Card>
  )
}

