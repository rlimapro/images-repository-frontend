'use client'

import { Template, RenderIf, InputText, Button } from "@/components"
import { useState } from 'react'
import { Formik } from 'formik'

interface LoginProps {

}

export default function Login() {

    const[loading, setLoading] = useState<boolean>(false);
    const[newUserState, setNewUserState] = useState<boolean>(true);
    
    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-light text-gray-900">
                        { newUserState ? "Create new user" : "Login to your account" }
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full" 
                                           id="name" />
                            </div>
                        </RenderIf>
                        
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full" 
                                        id="email" 
                                        type="email" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full" 
                                        id="password" 
                                        type="password" />
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Repeat password:</label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full" 
                                            id="passwordMatch" 
                                            type="password" />
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