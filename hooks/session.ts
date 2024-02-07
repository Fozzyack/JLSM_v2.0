import React, { createContext, useContext } from 'react'
import { ExtendedSession } from '@/types/authtypes'



export const SessionContext = createContext<ExtendedSession | undefined>(undefined)

export const getSessionContext = () => {
    const session = useContext(SessionContext)
    if (session === undefined || session.user === undefined) throw new Error("Please use within a session provider")
    return session
}


