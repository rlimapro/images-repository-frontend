import * as Yup from 'yup'

export interface LoginFormProps {
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const loginFormSchema: LoginFormProps = { name: "", email: "", password: "", passwordMatch: "" };

export const loginFormValidationSchema = Yup.object().shape({

    name: Yup.string()
             .trim()
             .max(50, "Name has the limit of 30 characters!"),

    email: Yup.string()
             .trim()
             .required("Email is required!")
             .email("Invalid email!"),
    
    password: Yup.string()
                 .required("Password is required!")
                 .min(8, "Password must have at least 8 characters!"),

    passwordMatch: Yup.string()
                      .oneOf( [ Yup.ref("password") ], "Password must match!")

}) 