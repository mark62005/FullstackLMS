"use client";

import { useSearchParams } from "next/navigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import Loading from "@/components/shared/Loading";
import CoursePreview from "@/components/checkout/CoursePreview";
import GuestCheckoutForm from "@/components/checkout/details/GuestCheckoutForm";
import SignUpComponent from "@/components/shared/auth/SignUp";
import SignInComponent from "@/components/shared/auth/SignIn";

function CheckoutDetailsPage() {
	const searchParams = useSearchParams();
	const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
	const showSignUp = searchParams.get("showSignUp") === "true";

	if (isLoading) return <Loading />;
	if (isError) return <div>Failed to fetch course data.</div>;
	if (!selectedCourse) return <div>404, Course not found.</div>;

	return (
		<div className="w-full h-fit gap-10">
			<div className="gap-10 sm:flex">
				<div className="basis-1/2 rounded-lg">
					<CoursePreview course={selectedCourse} />
				</div>

				<div className="basis-1/2 flex-1 h-auto flex flex-col gap-10">
					{/* TODO: Guest checkout feature */}
					<GuestCheckoutForm />

					{/* DIVIDER */}
					<div className="flex items-center justify-between">
						<hr className="w-full border-customgreys-dirtyGrey" />
						<span className="px-4 text-sm text-gray-400 whitespace-nowrap">
							Or
						</span>
						<hr className="w-full border-customgreys-dirtyGrey" />
					</div>

					{/* AUTH */}
					<div
						className="
							w-full flex justify-center items-center
							bg-customgreys-secondarybg rounded-lg
						"
					>
						{showSignUp ? <SignUpComponent /> : <SignInComponent />}
					</div>
				</div>
			</div>
		</div>
	);
}
export default CheckoutDetailsPage;
