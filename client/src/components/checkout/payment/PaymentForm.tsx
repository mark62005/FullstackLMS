import { PaymentElement } from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";

type PaymentFormProps = {
	handleSubmit: () => void;
};

function PaymentForm({ handleSubmit }: PaymentFormProps) {
	return (
		<div className="basis-1/2">
			<form
				id="payment-form"
				onSubmit={handleSubmit}
				className="space-y-4"
			>
				<div className="flex flex-col gap-4 bg-customgreys-secondarybg px-10 py-10 rounded-lg">
					<h1 className="text-2xl font-bold">Checkout</h1>
					<p className="text-sm text-gray-400">
						Fill out the payment details below to complete your purchase.
					</p>

					<div className="flex flex-col gap-2 w-full mt-6">
						<h3 className="text-md">Payment Method</h3>

						<div className="flex flex-col rounded-lg border-[2px] border-white-100/5">
							<div className="flex items-center gap-2 p-2 border-white-50/5">
								<CreditCard size={24} />
								<span>Credit/Debit Card</span>
							</div>

							<div className="px-4 py-6">
								<PaymentElement />
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default PaymentForm;
