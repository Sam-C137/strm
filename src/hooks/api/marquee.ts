// https://100best.music.apple.com/content/us/en-us/summaryData.json?cacheBuster=04042024

import type { MarqueeAlbumItem } from "@/lib/types.ts";
import { useQuery } from "@tanstack/react-query";

interface MarqueeDataImpl {
	albums: MarqueeAlbumItem[];
}

export function useGetLandingPageMarquee(page: 1 | 2 | 3) {
	return useQuery({
		queryKey: ["marquee:landing-page"],
		queryFn: async () => {
			const data = await fetch(`./marquee-summary${page}.json`);
			return data.json<MarqueeDataImpl>();
		},
	});
}
