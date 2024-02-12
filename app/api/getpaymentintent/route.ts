import options from "../auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { ExtendedSession } from "@/types/authtypes"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
})
export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(options) as  ExtendedSession
        if (!session.user.name || !session.user.email) throw new Error('User details are missing')
        const { checkid } = await req.json()
        let amount = -1
        switch (parseInt(checkid)) {
            case 1:
                amount = 4000
                break
            case 2:
                amount = 3000
                break
            case 3:
                amount = 10000
                break
            default:
                break
        }
        if (amount === -1) throw new Error('There was an Error processing the payment')
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'aud',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                user_id: session.user.id,
                name: session.user.name
            },
            receipt_email: session.user.email,
        });

        return Response.json(paymentIntent.client_secret, {status: 200})
        
        
    } catch (error: any) {
        console.log(error.message)
        return Response.json(error.message, {status: 500})
    }
}
