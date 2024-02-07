"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const AddFundsPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
    );
    }

export default AddFundsPage;
