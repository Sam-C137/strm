import { ExchangeSpotifyCodeForToken } from "@/lib/auth.ts";
import {
	createFileRoute,
	isRedirect,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { toast } from "sonner";

interface CallbackSearchParams {
	code: string | null;
	state: string | null;
	error: string | null;
}

export const Route = createFileRoute("/callback")({
	component: () => {
		const navigate = useNavigate();
		navigate({
			to: "/home",
			replace: true,
		}).catch(console.error);
	},
	validateSearch: (search: Record<string, string>): CallbackSearchParams => {
		return {
			code: search.code ?? null,
			state: search.state ?? null,
			error: search.error ?? null,
		};
	},
	loaderDeps: (opts) => {
		return {
			search: opts.search,
		};
	},
	loader: async (ctx) => {
		const { search } = ctx.deps;
		if (!search.code || !search.state) {
			toast.error(
				search.error ??
					"Unable to authenticate with Spotify. Please try again.",
			);
			throw redirect({
				to: "/",
			});
		}
		try {
			await ExchangeSpotifyCodeForToken(search.code, search.state);
		} catch (e) {
			if (isRedirect(e)) throw e;
			toast.error(`Unable to authenticate with Spotify. ${e}`);
			throw redirect({
				to: "/",
			});
		}
	},
	pendingComponent: () => (
		<main className="h-dvh w-screen">
			<div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40" />
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<p className="text-2xl md:text-3xl font-medium text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 animate-pulse">
					Getting your data ready
					<span className="block">
						This could take a while
						<span className="w-3 aspect-square rounded-[50%] animate-l5 inline-block ml-8" />
					</span>
				</p>
			</div>
		</main>
	),
});
