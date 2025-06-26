import type * as React from "react";

import { NavFooter } from "@/components/nav-footer.tsx";
import { NavLibrary } from "@/components/nav-library.tsx";
import { NavMain } from "@/components/nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Lightning } from "@/routes/-index-header.tsx";
import { Link } from "@tanstack/react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader className="px-6">
				<SidebarMenu>
					<SidebarMenuItem className="flex justify-between items-center md:justify-normal">
						<SidebarTrigger className="block md:hidden">
							<i className="text-3xl text-primary icon-[solar--close-circle-line-duotone]" />
						</SidebarTrigger>
						<SidebarMenuButton
							size="lg"
							asChild
							className="w-fit md:w-full gap-0 md:gap-2"
						>
							<Link to="/home">
								<div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Lightning />
								</div>
								<div className="grid -ml-2 flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium font-icon text-base leading-tight">
										Strm
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="px-6">
				<NavMain />
				<NavLibrary />
			</SidebarContent>
			<SidebarFooter className="px-6">
				<NavFooter />
			</SidebarFooter>
		</Sidebar>
	);
}
