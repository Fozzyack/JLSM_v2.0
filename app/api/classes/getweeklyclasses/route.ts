import { getServerSession } from "next-auth"
import options from "../../auth/[...nextauth]/options"
import { ExtendedSession } from "@/types/authtypes";
import { pool } from "@/utils/db";


export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(options) as ExtendedSession;
        if (session.user.privilege < 2) {
            return Response.json({msg: "Unauthorised Access"}, { status: 401 })
        }
        const { start, end } = await req.json()
        const sql = `
            SELECT u.name, c.start_time, c.end_time FROM classes c
            JOIN users u
            ON u.id=c.teacher_id
            WHERE c.start_time > $1 AND c.start_time < $2 
        `

        const classes = await pool.query(sql, [start, end])
        return Response.json(classes.rows)
    } catch (error: any) {
        console.log(error.message)
        return Response.json(error.message, {status: 500})
    }
}
