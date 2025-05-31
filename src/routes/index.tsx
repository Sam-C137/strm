import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { SpotifyLogin } from "@/lib/auth.ts";
import { IndexHeader } from "@/routes/-index-header.tsx";
import { IndexMarquee } from "@/routes/-index-marquee.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	head: () => ({
		meta: [
			{
				title: "strm⚡",
			},
		],
	}),
});

function Index() {
	return (
		<main className="min-h-dvh dark:bg-black grid text-center place-items-center w-full">
			<IndexHeader />
			<IndexMarquee />
			<div className="flex items-center">
				Your name btw: <Input />
			</div>
			<Button onClick={SpotifyLogin} size="base" variant="blue">
				<Spinner />
				Spotify
			</Button>
		</main>
	);
}
