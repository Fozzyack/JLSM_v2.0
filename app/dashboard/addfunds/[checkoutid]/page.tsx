"use client";
import React from "react";
import {
	Appearance,
	StripeElementsOptions,
	loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/funds/CheckoutForm";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PAYMENT_DISPLAY_DETAILS = [
	{
		name: "Private Lesson",
		price: 40,
		quantity: 1,
	},
	{
		name: "Group Lesson",
		price: 30,
		quanitiy: 1,
	},
	{
		name: "Group Lesson",
		price: 100,
		quantity: 4,
	},
];

const Checkout = ({ params }: { params: { checkoutid: string } }) => {
	const [clientSecret, setClientSecret] = React.useState("");
    const router = useRouter();
	React.useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/getpaymentintent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ checkid: params.checkoutid }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data))
			.catch((err: any) => console.log(err.message));
	}, []);

	const appearance: Appearance = {
		theme: "stripe",
	};
	const options: StripeElementsOptions = {
		appearance,
		clientSecret,
	};

	return (
		<div className=" flex flex-col items-center justify-center md:items-start md:justify-start ">
           <div className="bg-slate-400 p-2 font-bold text-slate-100 rounded-xl mb-4 absolute md:relative top-[70px] left-[20px] md:top-0 md:left-0">
                <button onClick={() => router.push('/dashboard/addfunds/')}>Back</button>
            </div>
			<div className="flex flex-col gap-4 items-center md:items-start">
				<h3 className="text-2xl font-semibold text-slate-500">
					Payment
				</h3>
				<p className="text-slate-500">Details:</p>
				<p className="text-slate-500">
					Total: $
					{
						PAYMENT_DISPLAY_DETAILS[parseInt(params.checkoutid) - 1]
							.price
					}
				</p>
				<p className="text-slate-500">
					Item:
					{
						PAYMENT_DISPLAY_DETAILS[parseInt(params.checkoutid) - 1]
							.name
					}{" "}
					x{" "}
					{
						PAYMENT_DISPLAY_DETAILS[parseInt(params.checkoutid) - 1]
							.quantity
					}
				</p>
			</div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default Checkout;
