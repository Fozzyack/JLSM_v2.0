import options from "../auth/[...nextauth]/options"
import { ExtendedSession } from "@/types/authtypes"
import { pool } from "@/utils/db"
import { getServerSession } from "next-auth"

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(options) as ExtendedSession
        if (!session.user) return Response.json({success: false, message: "Unauthorized"}, {status: 401})
        if (session.user.privilege < 2) return Response.json({success: false, message: "Unauthorized"}, {status: 401})

        const { teacherId, colour, startDate, endDate } = await req.json()
        if ( teacherId === -1 ) return Response.json({success: false, message: "No Teacher Selected"}, {status: 401})

        const check_classes_sql = `
            SELECT * FROM classes 
            WHERE end_time > $1 AND start_time < $2
        `

        const colliding_classes = await pool.query(check_classes_sql, [startDate, endDate])
        if (colliding_classes.rows.length >= 3 ) return Response.json({success: false, message: "Too many classes at the same time"}, {status: 401})

        const new_class_sql = `
            INSERT INTO classes (teacher_id, start_time, end_time)
            VALUES ($1, $2, $3)
        `
        const change_teacher_colour_sql = `
            UPDATE users 
            SET colour = $1
            WHERE id = $2
        `
        const client = await pool.connect()
        try {
            client.query('BEGIN')
            await client.query(new_class_sql, [teacherId, startDate, endDate])
            await client.query(change_teacher_colour_sql, [colour, teacherId])
            client.query('COMMIT')

        } catch(error: any) {
            client.query('ROLLBACK')
            throw new Error(error.message)
        }

        return Response.json({success: true}, {status: 200})

    } catch (error: any) {
        console.log(error.message)
        return Response.json(error.message, {status: 500})
    }
}
