import { Marquee } from "@/components/ui/marquee";
import { useGetLandingPageMarquee } from "@/hooks/api/marquee.ts";
import type { MarqueeAlbumItem } from "@/lib/types.ts";

interface MarqueeItemProps {
	album: MarqueeAlbumItem;
}

function MarqueeItem({ album }: MarqueeItemProps) {
	return (
		<figure className="hover:scale-105 rounded-lg cursor-pointer duration-300 ease-in-out">
			<img
				src={album.artwork.url
					.replace("{w}", `${album.artwork.width}`)
					.replace("{h}", `${album.artwork.height}`)}
				alt={album.name}
				className="size-30 sm:size-38 md:size-46 rounded-[inherit] object-cover"
			/>
			<figcaption className="sr-only">{album.name}</figcaption>
		</figure>
	);
}

export function IndexMarquee() {
	const { data: firstRow } = useGetLandingPageMarquee(1);
	const { data: secondRow } = useGetLandingPageMarquee(2);
	const { data: thirdRow } = useGetLandingPageMarquee(3);

	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
			<Marquee pauseOnHover className="[--duration:300s]" repeat={1}>
				{firstRow?.albums.map((album) => (
					<MarqueeItem key={album.name} album={album} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover className="[--duration:250s]" repeat={2}>
				{secondRow?.albums.map((album) => (
					<MarqueeItem key={album.name} album={album} />
				))}
			</Marquee>
			<Marquee pauseOnHover className="[--duration:300s]" repeat={1}>
				{thirdRow?.albums.map((album, i) => (
					<MarqueeItem key={i} album={album} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
		</div>
	);
}
