import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

export function IndexLoginAnimation() {
	const controls = useAnimation();

	useEffect(() => {
		const loop = async () => {
			while (true) {
				await controls.start({
					x: [0, 140, 140, 0],
					y: [0, 60, 60, 0],
					transition: {
						duration: 3,
						times: [0, 0.4, 0.6, 1],
						ease: "easeInOut",
					},
				});
			}
		};
		loop();
	}, [controls]);

	return (
		<div className="relative w-[300px] mx-auto h-[150px] mt-[50px] bg-inherit rounded-xl overflow-hidden pointer-events-none">
			<motion.button
				className="absolute bg-[#1db954] left-[50px] top-[50px] text-background dark:text-foreground font-semibold py-2 px-4 rounded-lg shadow-md pointer-events-none"
				initial={{ scale: 1 }}
				animate={{
					scale: [1, 0.95, 1],
				}}
				transition={{
					duration: 3,
					times: [0.5, 0.6, 0.7],
					ease: "easeInOut",
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				Login with Spotify
			</motion.button>
			<motion.svg
				className="absolute w-5 h-5 z-10"
				animate={controls}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					fillRule="evenodd"
					d="m11.433 16.464l1.203-1.202l2.626-2.626l1.202-1.203c1.232-1.23 1.847-1.846 1.702-2.508s-.963-.963-2.596-1.565l-5.45-2.007C6.861 4.152 5.232 3.55 4.392 4.39s-.24 2.47.962 5.73l2.006 5.45c.602 1.633.903 2.45 1.565 2.596s1.277-.47 2.508-1.702"
					clipRule="evenodd"
				/>
				<path
					fill="currentColor"
					d="m12.636 15.262l3.938 3.938c.408.408.612.612.84.706c.302.126.643.126.946 0c.228-.094.432-.298.84-.706c.407-.408.611-.612.706-.84a1.24 1.24 0 0 0 0-.946c-.095-.228-.299-.432-.706-.84l-3.939-3.938z"
					opacity="0.5"
				/>
			</motion.svg>
			<div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-muted" />
		</div>
	);
}
