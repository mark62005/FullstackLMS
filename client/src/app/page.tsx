import NonDashboardNavbar from "@/components/shared/navbar/NonDashboardNavbar";
import Landing from "./(non-dashboard)/landing/page";
import Footer from "@/components/shared/Footer";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<NonDashboardNavbar />

			<main className="flex flex-grow w-full h-full justify-center items-center">
				<Landing />
			</main>

			<Footer />
		</div>
	);
}
