import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/home")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				name: "description",
				content: "strm⚡ homepage, let's cook",
			},
			{
				title: "Home - strm⚡",
			},
		],
	}),
});

function RouteComponent() {
	return <div>Hello "/home"!</div>;
}
