import { ReactNode } from "react";
import NonDashboardNavbar from "@/components/shared/navbar/NonDashboardNavbar";
import Footer from "@/components/shared/Footer";

export default function NonDashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<NonDashboardNavbar />

			<main className="flex flex-grow w-full h-full justify-center items-center">
				{children}
			</main>

			<Footer />
		</div>
	);
}
