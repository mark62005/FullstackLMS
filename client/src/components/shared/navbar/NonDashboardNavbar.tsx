"use client";

import Link from "next/link";
import { Bell, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function NonDashboardNavbar() {
	const { user } = useUser();
	const userRole = user?.publicMetadata?.userType as "student" | "teacher";

	return (
		<nav className="w-full flex justify-center bg-customgreys-primarybg">
			{/* LEFT SIDE */}
			<div className="flex justify-between items-center w-3/4 py-8">
				<div className="flex justify-between items-center gap-14">
					{/* LOGO */}
					<Link
						href="/"
						className="font-bold text-lg sm:text-xl hover:text-customgreys-dirtyGrey"
					>
						MW
					</Link>

					{/* SEARCH BAR */}
					<div className="flex items-center gap-4">
						<div className="relative group">
							<Link
								href="/search"
								className="
                bg-customgreys-secondarybg pl-12 pr-6 py-3 rounded-xl text-customgreys-dirtyGrey text-sm
                transition-all duration-300
                hover:text-white-50 hover:bg-customgreys-darkerGrey
                sm:pl-14 sm:pr-20 sm:py-4 sm:text-base
              "
							>
								<span className="hidden sm:inline">Search Courses</span>
								<span className="sm:hidden">Search</span>
								<BookOpen
									className="
                  absolute left-3 top-1/2 text-customgreys-dirtyGrey
                  transform -translate-y-1/2 transition-all duration-300
                  sm:left-5
                "
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="flex items-center gap-2 sm:gap-4">
					{/* TODO: Add notification functionality */}
					<button className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
						<span
							className="
              absolute top-0 right-0 bg-blue-500 h-1.5 w-1.5 rounded-full 
              sm:h-2 sm:w-2
            "
						></span>
						<Bell className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
					</button>

					{/* SIGN IN BUTTONS */}
					{/* WHEN USER'S SIGNED IN */}
					<SignedIn>
						<UserButton
							appearance={{
								baseTheme: dark,
								elements: {
									userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
									userButtonBox: "scale-90 sm:scale-100",
								},
							}}
							showName={true}
							userProfileMode="navigation"
							userProfileUrl={
								userRole === "teacher" ? "/teacher/profile" : "/user/profile"
							}
						/>
					</SignedIn>
					{/* WHEN USER'S SIGNED OUT */}
					<SignedOut>
						<Link
							href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"}
							className="
								text-customgreys-dirtyGrey px-3 py-1.5 text-sm
								rounded-md border-customgreys-dirtyGrey border-[1px]  
								sm:px-4 sm:py-2 sm:text-base
								hover:bg-customgreys-darkerGrey hover:text-white-50 
							"
						>
							Login
						</Link>
						<Link
							href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"}
							className="
								bg-indigo-600 px-3 py-1.5 rounded-md text-sm 
								sm:px-4 sm:py-2 sm:text-base
								hover:bg-primary-600 hover:text-customgreys-primarybg 
							"
						>
							Create an Account
						</Link>
					</SignedOut>
				</div>
			</div>
		</nav>
	);
}
export default NonDashboardNavbar;
