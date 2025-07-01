import { PreferencesDialog } from "@/components/preferences-dialog.tsx";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { LogoutUser } from "@/lib/auth.ts";
import { cn } from "@/lib/utils.ts";
import { ChevronsUpDown } from "lucide-react";

export function NavFooter() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Popover>
					<SidebarMenuButton size="sm" asChild>
						<PopoverTrigger
							className={cn(
								buttonVariants({ variant: "outline" }),
								"cursor-pointer flex justify-between py-1 h-max bg-background/40 hover:bg-background/10",
							)}
						>
							<Avatar>
								<AvatarImage />
								<AvatarFallback>FB</AvatarFallback>
							</Avatar>
							Foo Bar
							<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
						</PopoverTrigger>
					</SidebarMenuButton>
					<PopoverContent className="p-0 w-72 ml-2 bg-card">
						<div className="flex px-1 pb-1 flex-col">
							<div className="w-full py-2 px-4 items-center border-b text-sm gap-4 justify-start flex hover:bg-transparent">
								<Avatar>
									<AvatarImage />
									<AvatarFallback>FB</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<div className="text-sm font-semibold">Foo Bar</div>
									<div className="text-xs">foo@gmail.com</div>
								</div>
							</div>
							<PreferencesDialog />
							<Button
								className="w-full flex gap-4 justify-start"
								variant="ghost"
								onClick={LogoutUser}
							>
								<i className="icon-[solar--exit-bold-duotone] size-4" />
								Sign out
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
