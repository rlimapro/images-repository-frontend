'use client'

import { Template, RenderIf, InputText, Button, FieldError, useNotification } from "@/components"
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { LoginFormProps, loginFormSchema, loginFormValidationSchema } from "./formSchema";
import { AccessToken, Credentials, useAuth, User } from "@/resources";
import { useRouter } from 'next/navigation'

export default function Login() {

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const[loading, setLoading] = useState<boolean>(false);
    const[newUserState, setNewUserState] = useState<boolean>(false);

    const formik = useFormik<LoginFormProps>({
        initialValues: loginFormSchema,
        onSubmit: handleSubmit,
        validationSchema: loginFormValidationSchema
    })

    async function handleSubmit(values : LoginFormProps) {
        if(!newUserState) {

            const credentials: Credentials = { 
                email: values.email, 
                password: values.password 
            }

            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push("/galeria")

            } catch(error: any) {
                const errorMessage = error?.message;
                notification.notify(errorMessage, "error");
            }
        } 
        else {

            const user: User = {
                name: values.name, 
                email: values.email,
                password: values.password
            };

            try {
                await auth.save(user);
                notification.notify("User saved succesfully!", "success");
                formik.resetForm();
                setNewUserState(false);

            } catch(error: any) {
                const errorMessage = error?.message;
                notification.notify(errorMessage, "error");
            }
        }
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