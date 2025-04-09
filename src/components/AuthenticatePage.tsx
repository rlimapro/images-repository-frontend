'use client'

import Login from "@/app/login/page";
import { useAuth } from "@/resources";
import { useState, useEffect } from "react";

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage = ( {children} : AuthenticatedPageProps ) => {

    const auth = useAuth();
    const isSessionValid: boolean = auth.isSessionValid();

    if (!isSessionValid) {
        return <Login />;
    }

    return (
        <>{children}</>
    );
}