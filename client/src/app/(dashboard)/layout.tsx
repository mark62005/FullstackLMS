"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

import Loading from "@/components/shared/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/AppSidebar";
import DashboardNavbar from "@/components/shared/navbar/DashboardNavbar";
import ChaptersSidebar from "@/components/courses/view/chapters/ChaptersSidebar";

type DashboardLayoutProps = {
	children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
	const pathname = usePathname();
	const { user, isLoaded } = useUser();
	const [courseId, setCourseId] = useState<string | null>(null);
	const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
		pathname
	);

	useEffect(() => {
		if (isCoursePage) {
			const match = pathname.match(/\/user\/courses\/([^\/]+)/);
			setCourseId(match ? match[1] : null);
		} else {
			setCourseId(null);
		}
	}, [isCoursePage, pathname]);

	if (!isLoaded) return <Loading />;
	if (!user) return <div>Please sign in to access this page.</div>;

	return (
		<SidebarProvider>
			<div className="min-h-screen w-full bg-customgreys-primarybg flex">
				{/* SIDEBAR */}
				<AppSidebar />

				{/* MAIN CONTENT */}
				<div className="flex flex-1 overflow-hidden">
					{/* CHAPTERS SIDEBAR */}
					{courseId && <ChaptersSidebar />}

					{/* BODY */}
					<div
						className={cn(
							`
                flex-grow min-h-screen transition-all duration-500 ease-in-out overflow-y-auto bg-customgreys-secondarybg
              `,
							{
								"bg-customgreys-primarybg": courseId,
							}
						)}
						style={{ height: "100vh" }}
					>
						<DashboardNavbar isCoursePage={false} />
						<main className="px-8 py-4">{children}</main>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}
export default DashboardLayout;
