import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { SpotifyLogin } from "@/lib/auth.ts";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

export function IndexCta() {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate(
			"img",
			{ opacity: [0, 1] },
			{ duration: 0.5, delay: stagger(0.15) },
		);
	}, [animate]);

	return (
		<div
			className="flex mx-auto relative w-[min(1000px,100%)] h-[70dvh] lg:h-dvh justify-center items-center bg-inherit overflow-hidden"
			ref={scope}
		>
			<motion.div
				className="z-50 text-center space-y-4 items-center flex flex-col"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.88, delay: 1.5 }}
			>
				<p className="text-5xl md:text-7xl z-50 text-foreground font-calendas italic">
					Ready to Tune In?
				</p>
				<button
					onClick={SpotifyLogin}
					type="button"
					className="text-xs font-semibold z-50 hover:scale-110 transition-transform bg-foreground text-background rounded-full py-2 w-20 cursor-pointer"
				>
					Continue
				</button>
			</motion.div>
			<Floating sensitivity={-1} className="overflow-hidden">
				<FloatingElement depth={0.5} className="top-[8%] left-[11%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[0].url}
						className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={1} className="top-[10%] left-[32%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[1].url}
						className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={2} className="top-[2%] left-[53%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[2].url}
						className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={1} className="top-[0%] left-[83%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[3].url}
						className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={1} className="top-[40%] left-[2%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[4].url}
						className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={2} className="top-[70%] left-[77%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[7].url}
						className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>

				<FloatingElement depth={4} className="top-[73%] left-[15%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[5].url}
						className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
				<FloatingElement depth={1} className="top-[80%] left-[50%]">
					<motion.img
						initial={{ opacity: 0 }}
						src={exampleImages[6].url}
						className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
					/>
				</FloatingElement>
			</Floating>
		</div>
	);
}

const exampleImages = [
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/1500x1500bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/de/e1/22/dee122e8-c9b6-9d06-185b-9a665c5e5f52/196589805232.jpg/4167x4167bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/66/90/306690d4-2a29-402e-e406-6b319ce7731a/886447227169.jpg/3000x3000bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0a/0b/31/0a0b31cc-077c-31bf-e7fe-612191774948/10UMGIM30072.rgb.jpg/1500x1500bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8e/35/6c/8e356cc2-0be4-b83b-d29e-b578623df2ac/23UM1IM34052.rgb.jpg/3000x3000bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fd/fd/8c/fdfd8c26-b8f9-4768-41d3-b24773250c65/886446605814.jpg/1500x1500bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/4000x4000bb.jpg",
	},
	{
		url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/36/2d/76362d74-cb7a-8ef9-104e-cde1d858e9a9/20UMGIM95279.rgb.jpg/3000x3000bb.jpg",
	},
];
