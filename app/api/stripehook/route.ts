import { pool } from '@/utils/db';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true
});


export const POST = async (req: Request) => {
    const sig = req.headers.get('stripe-signature')!;
    let event: Stripe.Event;
    try {
       event = stripe.webhooks.constructEvent(await req.text(), sig, process.env.STRIPE_WEBHOOK_SECRET!); 

        switch (event.type) {
            case 'payment_intent.succeeded':
                const PaymentIntent = event.data.object;
                const old_balance_sql = `
                    SELECT balance FROM balances WHERE user_id = $1
                `;
                const update_balance_sql = `
                    UPDATE balances SET balance = balance + $1 WHERE user_id = $2
                `;
                const insert_transaction_sql = `    
                    INSERT INTO transactions (user_id, amount, type, prev_balance, new_balance) VALUES
                    ($1, $2, $3, $4, $5)
                `;  

                const old_balance = await pool.query(old_balance_sql, [PaymentIntent.metadata.user_id]);
                const client = await pool.connect();
                try {
                    await client.query('BEGIN');
                    await client.query(update_balance_sql, [PaymentIntent.amount, PaymentIntent.metadata.user_id]);
                    await client.query(insert_transaction_sql, [PaymentIntent.metadata.user_id, PaymentIntent.amount, "stripe", old_balance.rows[0].balance, parseInt(old_balance.rows[0].balance) + PaymentIntent.amount]); 
                    await client.query("COMMIT");
                } catch(error: any) {
                    console.log(error.message)
                    return Response.json(error.message, {status: 500})
                }
                
            default:
                console.log('Unhandled event type', event.type);
        };

        return Response.json({recieved: true })

    } catch (error: any) {
        console.log(error.message)
        return Response.json(error.message, {status: 500})
    }

}
