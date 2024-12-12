import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function CompletionPage() {
	return (
		<div className="flex flex-col h-full items-center justify-center bg-background text-foreground">
			{/* CONTENT */}
			<div className="text-center">
				{/* ICON */}
				<div className="mb-4 rounded-full bg-green-500 p-3 inline-flex items-center justify-center">
					<Check className="w-16 h-16" />
				</div>

				{/* TITLE */}
				<h1 className="text-4xl font-bold mb-3">COMPLETED</h1>
				<p className="mb-1">
					Congrats! You have made a course purchase successfully!
				</p>
			</div>

			{/* SUPPORT */}
			<div className="">
				<p>
					Need help? Contact our{" "}
					<Button
						className="m-0 p-0 text-primary-700"
						variant="link"
						asChild
					>
						<a href="mailto:support@example.com">Customer support</a>
					</Button>
					.
				</p>
			</div>

			{/* ACTIONS */}
			<div
				className="
          flex justify-center px-4 py-2 mt-2 
          bg-secondary-700 rounded-lg cursor-pointer
          hover:bg-secondary-600
        "
			>
				<Link href="user/courses">Go to Courses</Link>
			</div>
		</div>
	);
}
export default CompletionPage;
