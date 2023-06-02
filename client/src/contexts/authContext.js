import { createContext, useEffect, useState } from 'react'
import axios from '../api/axios'

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=> {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

    const login = async (inputs) => {
        const res = await axios.post("/api/login", inputs)
        await setCurrentUser(res.data)
        console.log(currentUser)
    }

    const logout = async (inputs) => {
        const res = await axios.post("/api/logout")
        await setCurrentUser(null)
        console.log(res)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>{children}</AuthContext.Provider>
    )
}