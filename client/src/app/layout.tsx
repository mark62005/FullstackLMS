import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import { Toaster } from "sonner";

import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-dm-sans",
});

export const metadata: Metadata = {
	title: "Fullstack Learning Management Site",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${dmSans.className}`}>
					<Providers>
						<div className="mx-auto w-full h-full justify-center items-center">
							{children}
						</div>
						<Toaster
							richColors
							closeButton
						/>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
