import { Input } from "@/components/ui/input.tsx";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link } from "@tanstack/react-router";

export function NavMain() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarMenu>
				<SidebarMenuItem className="mb-4">
					<Link to="/home" className="relative">
						<i className="text-sm text-primary absolute left-3 top-1/2 -translate-y-1/2 icon-[solar--minimalistic-magnifer-linear]" />
						<Input
							className="h-[32px] text-xs md:text-xs rounded-[4px] ps-10"
							placeholder="Search"
						/>
					</Link>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/">
							<i className="text-xl text-primary icon-[solar--home-angle-bold-duotone]" />
							<span>All</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--music-note-bold-duotone]" />
							<span>Music</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--podcast-bold-duotone]" />
							<span>Podcasts</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
