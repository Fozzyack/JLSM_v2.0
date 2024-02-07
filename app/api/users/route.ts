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
    if (session.user.privilege < 2)
      throw new Error("User is not authorized to view this content");

    const sql = `
                SELECT u.id, name, verified, email, image, privilege, balance FROM users u
                JOIN balances bal 
                ON u.id=bal.user_id
                WHERE u.id != $1
            `;
    const result = await pool.query(sql, [session.user.id]);
    return Response.json(result.rows);
  } catch (error: any) {
    return Response.json(error.message, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = (await getServerSession(options)) as ExtendedSession;
    if (!session || !session.user) {
      throw new Error(
        "Expected User to be Signed in However No User was Found",
      );
    }
    if (session.user.privilege < 2) {
      throw new Error("User is not authorized to view this content");
    }
    const { id, name, balance, privilege } = await req.json();
    const updateUserSql = `
            UPDATE users
            SET name = $1, privilege = $2
            WHERE id = $3
        `;
    const updateBalanceSql = `
            UPDATE balances
            SET balance = $1
            WHERE user_id = $2
        `;

    await pool.query(updateUserSql, [name, privilege, id]);
    await pool.query(updateBalanceSql, [balance * 100, id]);
    return Response.json(session);
  } catch (error: any) {
    console.log(error.message);
    return Response.json(error.message, { status: 500 });
  }
};
