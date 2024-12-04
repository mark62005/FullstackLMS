"use client";

import Link from "next/link";
import { Bell, BookOpen } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type DashboardNavbarProps = {
	isCoursePage: boolean;
};

function DashboardNavbar({ isCoursePage }: DashboardNavbarProps) {
	const { user } = useUser();
	const userRole = user?.publicMetadata?.userType as "student" | "teacher";

	return (
		<nav
			className="
        w-full mb-6 px-4 pt-7 z-10
        sm:px-8
      "
		>
			<div className="flex justify-between items-center w-full my-3">
				{/* LEFT SIDE */}
				<div
					className="
            flex justify-between items-center gap-2 
            sm:gap-5
          "
				>
					{/* SIDEBAR TRIGGER */}
					<div className="md:hidden">
						<SidebarTrigger
							className="
                text-customgreys-dirtyGrey transition-colors 
                hover:text-white-50 
              "
						/>
					</div>

					{/* SEARCH BAR */}
					<div className="flex items-center gap-4">
						<div className="relative group">
							<Link
								href="/search"
								className={cn(
									`
                    bg-customgreys-primarybg pl-10 pr-6 py-3 rounded-xl text-customgreys-dirtyGrey text-sm
                    transition-all duration-300 
                    sm:pl-14 sm:pr-20 sm:py-4 sm:text-base
                    hover:text-white-50 hover:bg-customgreys-darkerGrey
                  `,
									{
										"!bg-customgreys-secondarybg": isCoursePage,
									}
								)}
							>
								<span className="hidden sm:inline">Search Courses</span>
								<span className="sm:hidden">Search</span>
								<BookOpen
									className="
                    absolute left-3 top-1/2 transform -translate-y-1/2 text-customgreys-dirtyGrey 
                    transition-all duration-300
                    sm:left-5
                  "
									size={18}
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="flex items-center gap-3 sm:gap-6">
					{/* TODO: Add notification functionality */}
					<button
						className="
              relative w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center
              sm:w-8 sm:h-8
            "
					>
						<span
							className="
              absolute top-0 right-0 bg-blue-500 h-1.5 w-1.5 rounded-full 
              sm:h-2 sm:w-2
            "
						></span>
						<Bell className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
					</button>

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
				</div>
			</div>
		</nav>
	);
}
export default DashboardNavbar;
