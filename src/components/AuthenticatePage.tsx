'use client'

import Login from "@/app/login/page";
import { useAuth } from "@/resources";
import { useState, useEffect } from "react";

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage = ( {children} : AuthenticatedPageProps ) => {

    const auth = useAuth();
    const [hasValidSession, setHasValidSession] = useState<boolean | null>(null); // Estado inicial como null

    useEffect(() => {
        // Só verifica a sessão no lado do cliente, após montagem
        setHasValidSession(auth.isSessionValid());
    }, [auth]);

    // Enquanto hasValidSession for null (ainda não verificado), não renderiza nada ou mostra um carregamento
    if (hasValidSession === null) {
        return <div>Loading...</div>; // Ou um spinner, se preferir
    }

    // Se a sessão não for válida, redireciona para a página de login
    if (!hasValidSession) {
        return <Login />;
    }

    return (
        <>{children}</>
    );
}