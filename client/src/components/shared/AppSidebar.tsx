import Link from "next/link";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	BookOpen,
	Briefcase,
	User,
	Settings,
	DollarSign,
	PanelLeft,
	LogOut,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import Loading from "./Loading";

const NAV_LINKS = {
	student: [
		{ Icon: BookOpen, label: "Courses", href: "/user/courses" },
		{ Icon: Briefcase, label: "Billing", href: "/user/billing" },
		{ Icon: User, label: "Profile", href: "/user/profile" },
		{ Icon: Settings, label: "Settings", href: "/user/settings" },
	],
	teacher: [
		{ Icon: BookOpen, label: "Courses", href: "/teacher/courses" },
		{ Icon: DollarSign, label: "Billing", href: "/teacher/billing" },
		{ Icon: User, label: "Profile", href: "/teacher/profile" },
		{ Icon: Settings, label: "Settings", href: "/teacher/settings" },
	],
};

function AppSidebar() {
	const pathname = usePathname();
	const { user, isLoaded } = useUser();
	const { signOut } = useClerk();
	const { toggleSidebar } = useSidebar();

	if (!isLoaded) return <Loading />;
	if (!user) return <div>User not found.</div>;

	const userType =
		(user.publicMetadata?.userType as "student" | "teacher") ?? "student";
	const currentNavLinks = NAV_LINKS[userType];

	return (
		<Sidebar
			collapsible="icon"
			style={{ height: "100vh" }}
			className="bg-customgreys-primarybg border-none shadow-lg"
		>
			{/* HEADER */}
			<SidebarHeader>
				<SidebarMenu className="mt-5 group-data-[collapsible=icon]:mt-7">
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							onClick={() => toggleSidebar()}
							className="group hover:bg-customgreys-secondarybg"
						>
							<div
								className="
                  flex justify-between items-center gap-5 pl-3 pr-1 h-10 w-full group
                  group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0
                "
							>
								{/* LEFT SIDE */}
								<div className="flex items-center gap-5">
									<Image
										src="/logo.svg"
										alt="Logo"
										width={25}
										height={20}
										className="
                      transition duration-200 w-auto
                      group-data-[collapsible=icon]:group-hover:brightness-7
                    "
									/>

									<p
										className="
                      text-lg font-extrabold 
                      group-data-[collapsible=icon]:hidden
                    "
									>
										MW
									</p>
								</div>

								{/* RIGHT SIDE */}
								<PanelLeft
									className="
                  text-gray-400 w-5 h-5 
                    group-data-[collapsible=icon]:hidden
                  "
								/>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* CONTENT */}
			<SidebarContent>
				<SidebarMenu className="mt-7 gap-0">
					{currentNavLinks.map((link) => {
						const isActive = pathname.startsWith(link.href);

						return (
							<SidebarMenuItem
								key={link.href}
								className={cn(
									`
                    group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4
                    hover:bg-customgreys-secondarybg
                  `,
									isActive && "bg-gray-800"
								)}
							>
								<SidebarMenuButton
									asChild
									size="lg"
									className={cn(
										`
                      gap-4 p-8 hover:bg-customgreys-secondarybg 
                      group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center
                    `,
										isActive && "text-customgreys-dirtyGrey"
									)}
								>
									<Link
										href={link.href}
										className="relative flex items-center"
									>
										{/* ICON */}
										<link.Icon
											className={cn(
												isActive ? "text-white-50" : "text-gray-500"
											)}
										/>

										{/* LABEL */}
										<span
											className={cn(
												`
                            font-medium text-md ml-4 
                            group-data-[collapsible=icon]:hidden
                          `,
												isActive ? "text-white-50" : "text-gray-500"
											)}
										>
											{link.label}
										</span>
									</Link>
								</SidebarMenuButton>

								{isActive && (
									<div className="absolute right-0 top-0 h-full w-[4px] bg-primary-750" />
								)}
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarContent>

			{/* FOOTER */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						{/* SIGN OUT BUTTON */}
						<SidebarMenuButton asChild>
							<button
								onClick={() => signOut()}
								className="text-primary-700 pl-8"
							>
								<LogOut className="mr-2 h-6 w-6" />
								<span>Sign Out</span>
							</button>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
export default AppSidebar;
