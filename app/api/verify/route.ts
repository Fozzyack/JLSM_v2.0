import { getServerSession } from "next-auth";
import React from "react";
import options from "../auth/[...nextauth]/options";
import { ExtendedSession } from "@/types/authtypes";
import { pool } from "@/utils/db";
export const PUT = async (req: Request) => {
  try {
    const session = (await getServerSession(options)) as ExtendedSession;
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.privilege < 2) {
      return Response.json({ error: "Not verified" }, { status: 401 });
    }

    const { id, verified } = await req.json();
    const sql = `
        UPDATE users
        SET verified = $1
        WHERE id = $2 
        
    `;
    pool.query(sql, [verified, id]);
    return Response.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return Response.json(error.message, { status: 500 });
  }
};
