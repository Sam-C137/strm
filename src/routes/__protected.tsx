import { AppSidebar } from "@/components/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { IsUserAuthorized } from "@/lib/auth.ts";
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
	return (
		<SidebarProvider>
			<AppSidebar className="p-0" />
			<Outlet />
		</SidebarProvider>
	);
}
