import { Link } from "@tanstack/react-router";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";

export function NavLibrary() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Your Library</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--playlist-bold-duotone]" />
							<span>Playlists</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--user-bold-duotone]" />
							<span>Artists</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--music-library-2-bold-duotone]" />
							<span>Albums</span>
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
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/home">
							<i className="text-xl text-primary icon-[solar--add-circle-bold-duotone]" />
							<span>Create</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
