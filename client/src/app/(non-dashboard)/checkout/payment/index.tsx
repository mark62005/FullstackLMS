import { FormEvent } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useCreateTransactionMutation } from "@/state/api";

import { toast } from "sonner";
import StripeProvider from "./StripeProvider";
import CoursePreview from "@/components/checkout/CoursePreview";
import PaymentForm from "@/components/checkout/payment/PaymentForm";
import { Button } from "@/components/ui/button";

function PaymentPageContent() {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useUser();
	const { signOut } = useClerk();
	const [createTransaction] = useCreateTransactionMutation();
	const { navigateToStep } = useCheckoutNavigation();
	const { course, courseId } = useCurrentCourse();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!stripe || !elements) {
			toast.error("Stripe service is not available. Please try again later.");
			return;
		}

		if (!user) {
			toast.error("User does not exist. Please sign in before purchasing.");
			return;
		}

		if (!course) {
			toast.error("404 Course not found.");
			return;
		}

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL}?id=${courseId}`,
			},
			redirect: "if_required",
		});

		if (result.paymentIntent?.status === "succeeded") {
			const transactionData: Partial<Transaction> = {
				transactionId: result.paymentIntent.id,
				userId: user.id,
				courseId: courseId,
				paymentProvider: "stripe",
				amount: course.price || 0,
			};

			try {
				await createTransaction(transactionData);
				navigateToStep(3);
			} catch (error) {
				console.error("Error create transaction.", error);
				toast.error(
					"An error occured when creating a transaction. Please try again later."
				);
			}
		}
	}

	async function handleSignOutAndNavigate() {
		await signOut();
		navigateToStep(1);
	}

	if (!course) return null;

	return (
		<div className="flex flex-col w-full">
			<div className="gap-10 mb-6 sm:flex">
				{/* ORDER SUMMARY */}
				<div className="basis-1/2 rounded-lg">
					<CoursePreview course={course} />
				</div>

				{/* PAYMENT FORM */}
				<PaymentForm handleSubmit={handleSubmit} />
			</div>

			{/* NAVIGATION BUTTONS */}
			<div className="flex justify-between items-center w-full mt-6">
				<Button
					className="hover:bg-white-50/10"
					onClick={handleSignOutAndNavigate}
					variant="outline"
					type="button"
				>
					Switch Account
				</Button>

				<Button
					className="bg-primary-700 hover:bg-primary-600"
					form="payment-form"
					type="submit"
					disabled={!stripe || !elements}
				>
					Pay with Credit Card
				</Button>
			</div>
		</div>
	);
}

function PaymentPage() {
	return (
		<StripeProvider>
			<PaymentPageContent />
		</StripeProvider>
	);
}
export default PaymentPage;
