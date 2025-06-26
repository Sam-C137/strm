import type {
	CompoundQueryFlags,
	CompoundQueryOptionArgs,
	CompoundQueryOptions,
	MarqueeAlbumItem,
} from "@/lib/types.ts";
import { queryOptions } from "@tanstack/react-query";

interface MarqueeData {
	albums: MarqueeAlbumItem[];
}

export const MarqueeData = {
	query<F extends CompoundQueryFlags = "default">({
		page,
		...options
	}: CompoundQueryOptionArgs<
		{
			page: 1 | 2 | 3;
		},
		F
	>) {
		return queryOptions({
			queryKey: ["marquee:landing-page", page],
			queryFn: async () => {
				const data = await fetch(`./marquee-summary${page}.json`);
				return data.json<MarqueeData>();
			},
			...options,
		}) as CompoundQueryOptions<MarqueeData>;
	},
};
