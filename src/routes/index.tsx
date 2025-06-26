import { Float } from "@/components/ui/float.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { IndexCta } from "@/routes/-index-cta.tsx";
import { IndexHeader } from "@/routes/-index-header.tsx";
import { IndexLoginAnimation } from "@/routes/-index-login-animation.tsx";
import { IndexMarquee } from "@/routes/-index-marquee.tsx";
import { IndexStats } from "@/routes/-index-stats.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { type MotionProps, motion, useInView } from "motion/react";
import { Fragment, Suspense, useRef } from "react";

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
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<main className="min-h-dvh p-0 bg-white dark:bg-black grid text-center place-items-center w-full">
			<IndexHeader />
			<Suspense
				fallback={
					<Fragment>
						{new Array(3).fill(null).map((_, idx) => (
							<div className="w-full overflow-x-auto flex gap-2 mb-2" key={idx}>
								{new Array(10).fill(null).map((_, idx) => (
									<Skeleton
										key={idx}
										className="size-30 sm:size-38 md:size-46 rounded-lg"
									/>
								))}
							</div>
						))}
					</Fragment>
				}
			>
				<IndexMarquee />
			</Suspense>
			<section className="w-full px-[10%] lg:px-0 flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-3xl lg:text-5xl font-bold goldtext leading-[2]">
					Welcome to strm⚡
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Strm is more than just a Spotify wrapper — it’s a bold reimagining of
					what a music player should feel like. Built from the ground up for
					speed, elegance, and delight.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Every click, scroll, and tap is designed to make music feel like an
					experience again. Thoughtfully designed for those who love to see the
					rhythm.
				</motion.div>
			</section>
			<section className="w-full px-[10%] lg:px-0 flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-3xl lg:text-5xl font-bold goldtext leading-[2]">
					Stunning UI
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Strm offers a visual experience worthy of your music taste. Clean
					layouts. Customizable themes. No distractions.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Smooth transitions. Real-time feedback. A look that adapts to your
					taste, not the other way around. Whether you’re vibing to jazz at
					midnight or EDM on full blast — Strm feels right.
				</motion.div>
			</section>
			<section className="w-full px-[10%] lg:px-0 flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-3xl lg:text-5xl font-bold goldtext leading-[2]">
					No Extra Accounts Needed
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					No new passwords. No emails to verify. No onboarding screens asking
					you your pet’s name. Just login with your Spotify account and you’re
					in. That’s it.
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					One click. Full access. Because we trust you to bring your own music.
				</motion.div>
				<IndexLoginAnimation />
			</section>
			<section className="lg:hidden w-full px-[10%] lg:px-0 flex flex-col gap-4 mt-12 mb-16">
				<h1 className="text-3xl lg:text-5xl font-bold goldtext leading-[2]">
					View Your Stats in Style
				</h1>
				<motion.div
					{...fadeInUp}
					className="text-xl lg:text-2xl max-w-3xl mx-auto text-foreground mb-6"
				>
					Get the inside scoop on what makes your music taste yours. Top genres.
					Listening streaks. Favorite albums. And more. All presented with
					elegant charts and animations — because data deserves good design too.
				</motion.div>
				<div className="flex flex-col items-center justify-center w-full h-full mt-12 mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.25, delay: 0.5, ease: "easeOut" }}
					>
						<Float>
							<div className="sm:w-40 sm:h-40 h-32 w-32 md:w-48 md:h-48 shadow-2xl relative overflow-hidden  hover:scale-105 duration-200 cursor-pointer transition-transform">
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/3b/a9/bd3ba9fb-9609-144f-bcfe-ead67b5f6ab3/196589564931.jpg/3000x3000bb.jpg"
									className="w-full h-full object-cover absolute top-0 left-0"
									alt="SZA - SOS"
									title="SZA - SOS"
								/>
							</div>
						</Float>
					</motion.div>
					<motion.h2
						className="pt-8 sm:pt-12 md:pt-16 text-xl sm:text-3xl md:text-4xl uppercase z-10"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.25, delay: 0.7, ease: "easeOut" }}
					>
						Album of the week
					</motion.h2>
				</div>
			</section>
			<IndexStats />
			<motion.section
				{...fadeInUp}
				className="text-xl px-[10%] lg:px-0 lg:text-2xl max-w-3xl mx-auto text-foreground mb-20"
			>
				Whether you’re curating playlists or chasing your repeat rewind, Strm is
				the music client that works with you.
			</motion.section>
			<section className="w-full h-dvh" ref={ref}>
				{isInView && <IndexCta />}
			</section>
		</main>
	);
}

export const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
	viewport: { amount: 0.2 },
} satisfies MotionProps;
