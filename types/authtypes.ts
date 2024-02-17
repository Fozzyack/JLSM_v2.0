
import { Session } from 'next-auth'
import { AdapterUser } from '@auth/core/adapters'

export interface ExtendedSession extends Session {
   user: ExtendedUser  
}

export interface ExtendedUser extends AdapterUser {
    id: string,
    name: string | null | undefined,
    image: string | null | undefined,
    email: string,
    privilege: number, 
    verified: boolean
    grade_id: number
    colour: string
}
 
