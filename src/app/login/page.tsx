'use client'

import { Template, RenderIf, InputText, Button, FieldError } from "@/components"
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { LoginFormProps, loginFormSchema, loginFormValidationSchema } from "./formSchema";

export default function Login() {

    const[loading, setLoading] = useState<boolean>(false);
    const[newUserState, setNewUserState] = useState<boolean>(true);

    const formik = useFormik<LoginFormProps>({
        initialValues: loginFormSchema,
        onSubmit: handleSubmit,
        validationSchema: loginFormValidationSchema
    })

    async function handleSubmit(values : LoginFormProps) {
        console.log(values);
    }
    
    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-light text-gray-900">
                        { newUserState ? "Create new user" : "Login to your account" }
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-2">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full" 
                                           id="name" 
                                           value={formik.values.name}
                                           onChange={formik.handleChange}/>
                                <FieldError error={formik.errors.name} />
                            </div>
                        </RenderIf>
                        
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full" 
                                        id="email" 
                                        type="email" 
                                        value={formik.values.email}
                                        onChange={formik.handleChange}/>
                            <FieldError error={formik.errors.email} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full" 
                                        id="password" 
                                        type="password" 
                                        value={formik.values.password}
                                        onChange={formik.handleChange}/>
                            <FieldError error={formik.errors.password} />
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Repeat password:</label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full" 
                                            id="passwordMatch" 
                                            type="password" 
                                            value={formik.values.passwordMatch}
                                            onChange={formik.handleChange}/>
                                <FieldError error={formik.errors.passwordMatch} />
                            </div>
                        </RenderIf>

                        <div className="mt-4">
                            <RenderIf condition={newUserState}>
                                <Button type="submit" 
                                        style="bg-indigo-500 hover:bg-indigo-300" 
                                        label="Save" />

                                <Button type="button" 
                                        style="bg-red-500 hover:bg-red-300 mx-2" 
                                        label="Cancel" 
                                        onClick={event => setNewUserState(false)} />
                            </RenderIf>
    
                            <RenderIf condition={!newUserState}>
                                <Button type="submit" 
                                        style="bg-indigo-500 hover:bg-indigo-300" 
                                        label="Login" />

                                <Button type="button" 
                                        style="bg-red-500 hover:bg-red-300 mx-2" 
                                        label="Sign up" 
                                        onClick={event => setNewUserState(true)} />
                            </RenderIf>
                        </div>
                        
                    </form>
                </div>
            </div>
        </Template>
    );
}