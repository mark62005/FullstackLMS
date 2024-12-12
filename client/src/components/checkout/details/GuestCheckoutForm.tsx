import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestCheckoutFormData, guestCheckoutFormSchema } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/form/CustomFormField";

function GuestCheckoutForm() {
	const methods = useForm<GuestCheckoutFormData>({
		resolver: zodResolver(guestCheckoutFormSchema),
		defaultValues: {
			email: "",
		},
	});

	function checkout(data: GuestCheckoutFormData) {
		// TODO: Guest checkout feature
		console.log(data);
	}

	return (
		<div className="w-full bg-customgreys-secondarybg py-12 px-24 rounded-lg">
			<h2 className="text-3xl font-bold text-center mb-2">Guest Checkout</h2>
			<p className="mb-6 text-sm text-center text-gray-400 mx-auto">
				Enter email to receive course access details and order confirmation. You
				can create an account after purchase.
			</p>

			<Form {...methods}>
				<form
					className="space-y-8"
					onSubmit={methods.handleSubmit(checkout)}
				>
					<CustomFormField
						type="email"
						name="email"
						label="Email Address"
						className="w-full rounded mt-4"
						labelClassName="font-normal text-white-50"
						inputClassName="py-3"
					/>

					<Button
						type="submit"
						className="
								w-full my-6 py-3 rounded shadow 
								bg-primary-700 text-white-100 text-sm font-semibold
								hover:bg-primary-600
							"
					>
						Continue as Guest
					</Button>
				</form>
			</Form>
		</div>
	);
}
export default GuestCheckoutForm;
