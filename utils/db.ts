import { Pool } from 'pg';

export const pool = new Pool(
    {
        connectionString: process.env.DBCONNSTR as string
    }
)


