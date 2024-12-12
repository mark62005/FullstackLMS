import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CHECKOUT_STEPS = ["Details", "Payment", "Completion"];

type CheckoutStepperProps = { currentStep: number };

function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
	return (
		<div className="w-1/2 mb-4 flex flex-col items-center">
			<div className="w-full flex items-center justify-between mb-2">
				{CHECKOUT_STEPS.map((stepLabel, index) => {
					const step = index + 1;

					return (
						<Fragment key={index}>
							{/* ICON AND TEXT */}
							<div className="flex flex-col items-center">
								<div
									className={cn(
										"w-8 h-8 flex items-center justify-center rounded-full mb-2",
										{
											"bg-green-500":
												currentStep > step || (currentStep === 3 && step === 3),
											"bg-primary-700": currentStep === step && step !== 3,
											"border border-customgreys-dirtyGrey text-customgreys-dirtyGrey":
												currentStep < step,
										}
									)}
								>
									{currentStep > step || (currentStep === 3 && step === 3) ? (
										<Check className="w-5 h-5" />
									) : (
										<span>{step}</span>
									)}
								</div>

								<p
									className={cn("text-sm", {
										"text-white-100": currentStep >= step,
										"text-customgreys-dirtyGrey": currentStep < step,
									})}
								>
									{stepLabel}
								</p>
							</div>

							{/* LINE */}
							{index < 2 && (
								<div
									className={cn("w-1/4 h-[1px] self-start mt-4", {
										"bg-green-500": currentStep > step,
										"bg-customgreys-dirtyGrey": currentStep <= step,
									})}
								/>
							)}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}
export default CheckoutStepper;
