import React from 'react';
import {pool} from '@/utils/db'
import { getServerSession } from 'next-auth';
import { ExtendedSession } from '@/types/authtypes';
import { redirect } from 'next/navigation';
import options from '@/app/api/auth/[...nextauth]/options';
const getTransactionsList = async () => {
    const sql = `
        SELECT u1.name AS user_name, u2.name as admin_name, amount, type, timestamp, prev_balance, new_balance FROM transactions t
        JOIN users u1 ON t.user_id = u1.id
        LEFT JOIN users u2 ON t.manual_user_update_id = u2.id
        ORDER BY timestamp DESC 
    `;
    const transactions = await pool.query(sql);
    return transactions.rows;
}
const Transactions = async () => {
    const transactions = await getTransactionsList();
    const session = await getServerSession(options) as ExtendedSession;
    if (!session || !session.user || session.user.privilege < 2) {
        console.error('Unauthorized access in /dashboard/transactions');
        return redirect('/dashboard');
    }
    return (
        <div className="flex flex-col w-full h-full p-8">
            <div className="overflow-x-auto w-full rounded-md border-slate-300 border">
                <table className="w-full divide-y divide-slate-300">
                    <thead>
                        <tr className="text-sm text-slate-400 uppercase">
                            <th className="text-start py-2 px-3">User</th>
                            <th className="text-start py-2 px-3">Amount transfered</th>
                            <th className="text-start py-2 px-3">Type</th>
                            <th className="text-start py-2 px-3">Timestamp</th>
                            <th className="text-start py-2 px-3">Admin</th>
                            <th className="text-start py-2 px-3">Previous Balance</th>
                            <th className="text-start py-2 px-3">New Balance</th>
                        </tr>   
                    </thead>
                    <tbody className="divide-y divide-slate-300 ">
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="text-sm text-black">
                                <td className="text-start py-2 px-3">{transaction.user_name}</td>
                                <td className="text-start py-2 px-3">${transaction.amount / 100}</td>
                                <td className="text-start py-2 px-3">{transaction.type}</td>
                                <td className="text-start py-2 px-3">{transaction.timestamp.toLocaleString()}</td>
                                <td className="text-start py-2 px-3">{transaction.admin_name}</td>
                                <td className="text-start py-2 px-3">${transaction.prev_balance / 100}</td>
                                <td className="text-start py-2 px-3">${transaction.new_balance / 100}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
