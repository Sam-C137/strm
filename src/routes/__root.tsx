import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "@/integrations/tanstack-query/layout.tsx";

import { Toaster } from "@/components/ui/sonner.tsx";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<HeadContent />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
			<TanStackQueryLayout />
			<Toaster />
		</>
	),
});
