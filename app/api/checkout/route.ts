import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2023-10-16',
});

export const POST = async (req: any) => {
    const { amount } = await req.json();
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'aud',
            
        });
        return Response.json(paymentIntent.client_secret, {status: 200});

    } catch (error : any) {
        console.log(error.message);
        return Response.json(error.message, {status: 500});
    }
}
