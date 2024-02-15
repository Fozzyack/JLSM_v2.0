import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(options)
        const { timeslot, date } = await req.json();
        console.log (timeslot, date)
        console.log(typeof(date))
        return Response.json({status: 'success'})
    } catch (error: any) {
        console.log(error.message)
        return Response.json(error.message, {status: 500})
    }
}
