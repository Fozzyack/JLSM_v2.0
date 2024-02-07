import options from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { ExtendedSession } from '@/types/authtypes';
import { pool } from '@/utils/db';
 
export async function GET(req: Request) {
        try {
            const session = await getServerSession(options) as ExtendedSession
            const sql = `
                SELECT balance FROM balances WHERE user_id = $1
            `
            const result = await pool.query(sql, [session.user.id])
            return Response.json(result.rows[0])
        } catch (error : any) {
            return Response.json(error.message, {status: 500})
        }
}

export async function POST(req: Request){
    try {
        const session = await getServerSession(options) as ExtendedSession
        const newBalance = await req.json()
        const sql = `
            INSERT INTO balances ("userId", balance) VALUES ($1, $2)
        `
        await pool.query(sql, [session.user.id, newBalance.balance])
        return Response.json({success: true})
    } catch (error : any) {
        return Response.json(error.message, {status: 500});
    }
}
