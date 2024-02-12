import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";
import { ExtendedSession } from "@/types/authtypes";
import { pool } from "@/utils/db";

export const GET = async (req: Request) => {
  try {
    const session = (await getServerSession(options)) as ExtendedSession;
    if (!session || !session.user)
      throw new Error(
        "Expected User to be Signed in However No User was Found",
      );

    const sql = `
            SELECT u.name as name, u.email, u.image, u.privilege, g.name as grade, g.difficulty FROM users u
            JOIN grades g
            ON g.id = u.grade_id
            WHERE privilege >= 1 AND verified = true
        `;

    const result = await pool.query(sql);
    return Response.json(result.rows);
  } catch (error: any) {
    return Response.json(error.message, { status: 500 });
  }
};
