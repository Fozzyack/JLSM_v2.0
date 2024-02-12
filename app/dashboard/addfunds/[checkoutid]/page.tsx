'use client';
import React, {useState, useEffect} from 'react';
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/funds/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({params} : {params : { checkoutid: string }}) => {
  const [clientSecret, setClientSecret] = React.useState("");
    
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/getpaymentintent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkid: params.checkoutid} ),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data))
      .catch((err : any) => console.log(err.message));
  }, []);
    
    const appearance : Appearance= {
        theme: 'stripe',
    }
    const options : StripeElementsOptions= {
        appearance,
        clientSecret,
    };

    return (
        <div className="h-full">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default Checkout;
