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
                WHERE u.id != $1 AND u.privilege < 3
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
    const getPrevBalanceSql = `
            SELECT balance FROM balances
            WHERE user_id = $1
    `;
    
    const prevBalance = (await pool.query(getPrevBalanceSql, [id])).rows[0].balance;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(updateUserSql, [name, privilege, id]);
      await client.query(updateBalanceSql, [
        balance * 100,
        id,
      ]);
      if (prevBalance - balance * 100 !== 0) {
          const transactionSql = `
            INSERT INTO  transactions (user_id, amount, manual_user_update_id, prev_balance, new_balance, type) VALUES
            ($1, $2, $3, $4, $5, $6)
          `
          await client.query(transactionSql, [id, balance * 100 - prevBalance, session.user.id, prevBalance, balance * 100, "manual"])
      }
      await client.query("COMMIT");
    } catch (error: any) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }

    return Response.json(session);
  } catch (error: any) {
    console.log(error.message);
    return Response.json(error.message, { status: 500 });
  }
};
