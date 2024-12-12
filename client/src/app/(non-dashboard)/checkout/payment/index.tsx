import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import StripeProvider from "./StripeProvider";
import CoursePreview from "@/components/checkout/CoursePreview";
import PaymentForm from "@/components/checkout/payment/PaymentForm";
import { Button } from "@/components/ui/button";

function PaymentPageContent() {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useUser();
	const { signOut } = useClerk();
	// TODO: const [createTransaction] = useCreateTransactionMutation();
	const { navigateToStep } = useCheckoutNavigation();
	const { course, courseId } = useCurrentCourse();

	function handleSubmit() {
		// TODO
	}

	function handleSignOutAndNavigate() {
		// TODO
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
