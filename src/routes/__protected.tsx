import { AppSidebar } from "@/components/app-sidebar.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { useWatchUserPreferences } from "@/hooks/use-watch-user-preferences.ts";
import { IsUserAuthorized, LogoutUser } from "@/lib/auth.ts";
import { useUserSettings } from "@/lib/state/settings.ts";
import { Lightning } from "@/routes/-index-header.tsx";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected")({
	beforeLoad: async () => {
		const pass = await IsUserAuthorized();
		if (!pass)
			throw redirect({
				to: "/",
			});
	},
	component: ProtectedLayout,
});

function ProtectedLayout() {
	const side = useUserSettings((state) => state.sidebarPosition);
	useWatchUserPreferences();
	return (
		<SidebarProvider>
			<AppSidebar className="p-0" side={side} />
			<main className="flex flex-col w-full">
				<ProtectedHeader />
				<TooltipProvider>
					<Outlet />
				</TooltipProvider>
			</main>
		</SidebarProvider>
	);
}

function ProtectedHeader() {
	return (
		<nav className="flex items-center p-3 justify-between w-full sticky top-0">
			<SidebarTrigger className="block md:hidden">
				<i className="text-2xl icon-[solar--hamburger-menu-line-duotone]" />
			</SidebarTrigger>
			<span className="truncate font-icon flex items-center gap-[-5px] md:hidden font-medium text-base leading-tight">
				<Lightning /> <span className="-ml-2">Strm</span>
			</span>
			<button
				type="button"
				className="block md:hidden text-sm font-semibold text-primary"
				onClick={LogoutUser}
			>
				Sign out
			</button>
		</nav>
	);
}
