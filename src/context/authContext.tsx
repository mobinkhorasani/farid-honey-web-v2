'use client'

import { storage } from "@/app/auth/utils/storage"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface User {
    name: string
    phone_number: string
    role: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, user: User) => void
    logout: () => void
    isAuthenticated: boolean
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = storage.get<string>("auth_token")
        const storedUser = storage.get<User>("auth_user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(storedUser)
        }
    }, [])

    const login = (token: string, user: User) => {
        setToken(token)
        setUser(user)

        storage.set("auth_token", token)
        storage.set("auth_user", user)
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        storage.remove("auth_token")
        storage.remove("auth_user")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
