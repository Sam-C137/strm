import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { SpotifyLogin } from "@/lib/auth.ts";
import { IndexHeader } from "@/routes/-index-header.tsx";
import { IndexMarquee } from "@/routes/-index-marquee.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

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
		<main className="min-h-dvh p-0 dark:bg-black grid text-center place-items-center w-full">
			<IndexHeader />
			<IndexMarquee />
			<section className="w-full flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-5xl font-bold goldtext leading-[2]">
					Welcome to strm⚡
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Strm is more than just a Spotify wrapper — it’s a bold reimagining of
					what a music player should feel like. Built from the ground up for
					speed, elegance, and delight.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Every click, scroll, and tap is designed to make music feel like an
					experience again. Thoughtfully designed for those who love to see the
					rhythm.
				</motion.div>
			</section>
			<section className="w-full flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-5xl font-bold goldtext leading-[2]">Stunning UI</h1>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Strm offers a visual experience worthy of your music taste. Clean
					layouts. Customizable themes. No distractions.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Smooth transitions. Real-time feedback. A look that adapts to your
					taste, not the other way around. Whether you’re vibing to jazz at
					midnight or EDM on full blast — Strm feels right.
				</motion.div>
			</section>
			<section className="w-full flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-5xl font-bold goldtext leading-[2]">
					No Extra Accounts Needed
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					No new passwords. No emails to verify. No onboarding screens asking
					you your pet’s name. Just login with your Spotify account and you’re
					in. That’s it.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					One click. Full access. Because we trust you to bring your own music.
				</motion.div>
			</section>
			<section className="w-full flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-5xl font-bold goldtext leading-[2]">
					View Your Stats in Style
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Get the inside scoop on what makes your music taste yours. Top genres.
					Listening streaks. Favorite albums. And more. All presented with
					elegant charts and animations — because data deserves good design too.
				</motion.div>
				{/*Album of the year fancy component*/}
				{/*Song of the year fancy component*/}
			</section>
			<motion.section {...fadeInUp} className="w-full">
				{/*fancy show of multiple albums with get started button	*/}
			</motion.section>
			<motion.section
				{...fadeInUp}
				className="text-2xl max-w-3xl mx-auto text-foreground mb-6"
			>
				Ready to Start Listening Better? Whether you’re curating playlists or
				chasing your repeat rewind, Strm is the music client that works with
				you.
				<Button onClick={SpotifyLogin} size="base" variant="blue">
					<Spinner />
					Spotify
				</Button>
			</motion.section>
		</main>
	);
}

export const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
	viewport: { amount: 0.2 },
};
