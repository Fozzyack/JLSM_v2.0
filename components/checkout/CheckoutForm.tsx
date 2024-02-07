"use client";
import React from "react";
import { PaymentElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

    
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    if (!stripe || !cardElement) return null;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10 }),
      });
      const data = await response.json();
      const test = await stripe.confirmCardPayment(data, {
        payment_method: {
          card: cardElement,
        },
      });
      if (test?.error) throw new Error(test.error.code);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <form onSubmit={onSubmit}>
        <CardElement/>
        <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
