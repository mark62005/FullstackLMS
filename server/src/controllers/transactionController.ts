import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error(
		"STRIPE_SECRET_KEY is required but was not found in env variables."
	);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe payment intent, then return the client secret of it if successful.
 *
 * @param amount Amount of the transaction
 */
export async function createStripePaymentIntent(
	req: Request,
	res: Response
): Promise<void> {
	let { amount } = req.body;
	if (!amount || amount <= 0) {
		amount = 50;
	}

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "cad",
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: "never",
			},
		});

		res.json({
			message: "",
			data: {
				clientSecret: paymentIntent.client_secret,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating Stripe payment intent.", error });
	}
}
