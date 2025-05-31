import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";

export function NavFooter() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton asChild size="sm">
					<p>
						{/*<item.icon />*/}
						<span>Switch to light theme</span>
					</p>
				</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton asChild size="sm">
					<p>
						{/*<item.icon />*/}
						<span>Logout</span>
					</p>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
