"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeElements, StripePaymentElementOptions } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/success`,
      },
    });

    console.log(error);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };
  return (
    <form
      id="payment-form"
      className="flex flex-col gap-4 w-full items-center md:items-stretch justify-center h-full"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <motion.button
        whileHover={{ y: -5 }}
        type="submit"
        className="max-w-[200px] p-4 bg-gradient-to-r rounded-md from-yellow-500 to-yellow-400 text-white font-bold"
      >
        Submit Payment
      </motion.button>
    </form>
  );
};

export default CheckoutForm;
