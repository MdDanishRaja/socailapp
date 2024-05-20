"use server"

import { LoginValidator, RegisterValidator } from "@/validations/authSchema";
import { errors } from "@vinejs/vine";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(prevState: any, formdata:FormData){
    const supabase = createClient();
    try{
    const data = {
        name: formdata.get("name"),
        username: formdata.get("username"),
        email: formdata.get("email"),
        password: formdata.get("password"),
        password_confirmation: formdata.get("password_confirmation"), 
    };
    const payload = await RegisterValidator.validate(data)
    //check user name if exist 
    const {data:userData, error} = await supabase.from("users").
    select("id").eq("usename", payload.username);
    // console.log("The user data", userData);
    // console.log("The error is", error);

    if(userData && userData?.length > 0){
        return {
            status: 400,
            errors:{
                username:"Username is already taken. please usser another username "
            }
        }
    }

    const {error: signupErr} = await supabase.auth.signUp({
        email : payload.email,
        password: payload.password,
        options:{
            data:{
                name:payload.name,
                username: payload.username,
            }
        }
    })
    if(signupErr){
        return {status:400, errors:{email:signupErr.message}}
    }

    //login after sign up
    await supabase.auth.signInWithPassword({
        email:payload.email,
        password:payload.password,
    })

    }catch(error){
        if(error instanceof errors.E_VALIDATION_ERROR){
            // console.log(error.messages)
            return {status: 400, errors:error.messages}
        }
    }
    return redirect("/")
}


export async function loginAction(prevState:any, formdata:FormData){
    const supabase = createClient();
    try{
        const data ={
            email:formdata.get("email"),
            password:formdata.get("password"),
        }
        const payload = await LoginValidator.validate(data);
        const {error} = await supabase.auth.signInWithPassword({
            email:payload.email,
            password:payload.password,
        })
        if(error){
            return {
                status:400,
                errors:{
                    email:error.message
                }
            }
        }
    }
    catch(error){
        if(error instanceof errors.E_VALIDATION_ERROR){
            // console.log(error.messages)
            return {status: 400, errors:error.messages}
    }
  }
  redirect("/");
}


