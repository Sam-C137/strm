import type { MarqueeAlbumItem } from "@/lib/types.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

interface MarqueeData {
	albums: MarqueeAlbumItem[];
}

export function useGetLandingPageMarquee(page: 1 | 2 | 3) {
	return useSuspenseQuery({
		queryKey: ["marquee:landing-page", page],
		queryFn: async () => {
			const data = await fetch(`./marquee-summary${page}.json`);
			return data.json<MarqueeData>();
		},
	});
}
