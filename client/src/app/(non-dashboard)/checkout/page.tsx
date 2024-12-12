"use client";

import { useUser } from "@clerk/nextjs";
import Loading from "@/components/shared/Loading";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CheckoutDetailsPage from "./details";
import PaymentPage from "./payment";

function CheckoutPage() {
	const { isLoaded } = useUser();
	const { checkoutStep } = useCheckoutNavigation();

	if (!isLoaded) return <Loading />;

	function renderStep() {
		switch (checkoutStep) {
			case 1:
				return <CheckoutDetailsPage />;
			case 2:
				return <PaymentPage />;
			case 3:
				return "completion page";

			default:
				return <CheckoutDetailsPage />;
		}
	}

	return (
		<div className="w-full px-4 h-full flex flex-col items-center py-12">
			<CheckoutStepper currentStep={2} />
			<div className="w-full max-w-screen-lg flex flex-col items-center mt-10">
				{renderStep()}
			</div>
		</div>
	);
}
export default CheckoutPage;
