import { Button } from "@/components/ui/button.tsx";
import { BreathingText } from "@/components/ui/text-breathing.tsx";
import { useInterval } from "@/hooks/use-interval.ts";
import { SpotifyLogin } from "@/lib/auth.ts";
import { time } from "@/lib/constants.ts";
import * as React from "react";

export function IndexHeader() {
	return (
		<nav className="w-full sticky -mt-[42px] top-0 z-20 dark:bg-black bg-background flex items-center justify-center after:h-[40px] after:block after:absolute after:w-full after:bottom-[-16px] after:bg-background after:transition-all dark:after:bg-black after:z-[-1] after:blur-[8px]">
			<div className="w-full max-w-[1152px] flex flex-col">
				<div className="w-full items-center relative flex justify-between p-[20px_22px_4px]">
					<span className="font-icon flex items-center">
						<BreathingText
							label="strm"
							staggerDuration={0.1}
							className="ml-2 text-2xl"
							fromFontVariationSettings="'wght' 100, 'slnt' 0"
							toFontVariationSettings="'wght' 800, 'slnt' -10"
						/>
						<Lightning />
					</span>
					<button
						onClick={SpotifyLogin}
						type="button"
						className="font-semibold text-base cursor-pointer text-primary"
					>
						Sign In
					</button>
				</div>
				<div className="relative flex justify-start">
					<div className="ml-6 w-max flex items-center gap-1">
						<Button
							size="icon"
							variant="ghost"
							className="p-[6px] hover:bg-foreground dark:hover:bg-foreground transition-all hover:text-background"
						>
							<i className="text-lg icon-[solar--playlist-bold]" />
						</Button>
						<Button
							size="icon"
							variant="ghost"
							className="p-[6px] hover:bg-foreground dark:hover:bg-foreground transition-all hover:text-background"
						>
							<i className="text-lg icon-[solar--minimalistic-magnifer-linear]" />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}

function Lightning() {
	const [id, setId] = React.useState(crypto.randomUUID());
	useInterval(() => {
		setId(crypto.randomUUID());
	}, time.Second * 4);

	return (
		<svg
			key={id}
			xmlns="http://www.w3.org/2000/svg"
			width="2em"
			height="2em"
			viewBox="0 0 512 512"
		>
			<defs>
				<linearGradient
					id="meteoconsLightningBoltFill0"
					x1="8.7"
					x2="80.9"
					y1="17.1"
					y2="142.1"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#f7b23b" />
					<stop offset=".5" stopColor="#f7b23b" />
					<stop offset="1" stopColor="#f59e0b" />
				</linearGradient>
				<symbol id="meteoconsLightningBoltFill1" viewBox="0 0 102.7 186.8">
					<path
						fill="url(#meteoconsLightningBoltFill0)"
						stroke="#f6a823"
						strokeMiterlimit="10"
						strokeWidth="4"
						d="m34.8 2l-32 96h32l-16 80l80-112h-48l32-64h-48z"
					>
						<animate
							id="meteoconsLightningBoltFill2"
							attributeName="opacity"
							begin="0s; x1.end+.67s"
							dur="1.33s"
							keyTimes="0; .38; .5; .63; .75; .86; .94; 1"
							values="1; 1; 0; 1; 0; 1; 0; 1"
						/>
					</path>
				</symbol>
			</defs>
			<use
				width="102.7"
				height="186.7"
				href="#meteoconsLightningBoltFill1"
				transform="translate(186.37 130)scale(1.36)"
			/>
		</svg>
	);
}
