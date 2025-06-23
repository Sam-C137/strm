import { Card, CardContent } from "@/components/ui/card";
import { Clock, Music, TrendingUp } from "lucide-react";
import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { useMemo } from "react";

export function IndexStats() {
	const contributionData = useMemo(() => {
		const data = [];
		for (let week = 0; week < 12; week++) {
			const weekData = [];
			for (let day = 0; day < 7; day++) {
				weekData.push(Math.floor(Math.random() * 5));
			}
			data.push(weekData);
		}
		return data;
	}, []);

	const getActivityColor = (level: number) => {
		switch (level) {
			case 0:
				return "bg-gray-800/30";
			case 1:
				return "bg-purple-900/40";
			case 2:
				return "bg-purple-700/50";
			case 3:
				return "bg-purple-500/60";
			case 4:
				return "bg-purple-400/70";
			default:
				return "bg-gray-800/30";
		}
	};

	return (
		<motion.section
			{...fadeInUp}
			className="relative hidden lg:block overflow-hidden mt-16 mb-20"
		>
			<div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-transparent  to-white dark:to-black z-10" />
			<div className="relative z-0 max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-40">
					<div className="space-y-4">
						<Card className="bg-card dark:bg-gray-900/40 border-gray-800/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="p-2 bg-purple-500/20 rounded-lg">
										<Music className="h-4 w-4 text-purple-400" />
									</div>
									<div>
										<p className="text-lg font-bold text-foreground">1,247</p>
										<p className="text-xs text-muted-foreground">
											Songs Played
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-card dark:bg-gray-900/40 border-gray-800/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="p-2 bg-blue-500/20 rounded-lg">
										<Clock className="h-4 w-4 text-primary" />
									</div>
									<div>
										<p className="text-lg font-bold text-foreground">89.2</p>
										<p className="text-xs text-muted-foreground">
											Hours Listened
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-card dark:bg-gray-900/40 border-gray-800/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="p-2 bg-green-500/20 rounded-lg">
										<TrendingUp className="h-4 w-4 text-green-400" />
									</div>
									<div>
										<p className="text-lg font-bold text-foreground">
											Indie Rock
										</p>
										<p className="text-xs text-muted-foreground">Top Genre</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<Card className="bg-card dark:bg-gray-900/40 border-gray-800/30 backdrop-blur-sm">
						<CardContent className="p-4">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-semibold text-foreground">
										Listening Activity
									</h3>
									<div className="flex items-center space-x-1 text-xs text-muted-foreground">
										<span>Less</span>
										<div className="flex space-x-0.5">
											<div className="w-2 h-2 rounded-sm bg-gray-800/30" />
											<div className="w-2 h-2 rounded-sm bg-purple-900/40" />
											<div className="w-2 h-2 rounded-sm bg-purple-700/50" />
											<div className="w-2 h-2 rounded-sm bg-purple-500/60" />
											<div className="w-2 h-2 rounded-sm bg-purple-400/70" />
										</div>
										<span>More</span>
									</div>
								</div>
								<div className="flex space-x-0.5">
									{contributionData.map((week, weekIndex) => (
										<div key={weekIndex} className="flex flex-col space-y-0.5">
											{week.map((day, dayIndex) => (
												<div
													key={`${weekIndex}-${dayIndex}`}
													className={`w-2 h-2 rounded-sm ${getActivityColor(day)}`}
												/>
											))}
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-card dark:bg-gray-900/40 border-gray-800/30 backdrop-blur-sm">
						<CardContent className="p-4">
							<h3 className="text-sm font-semibold text-foreground mb-4">
								Top Artists
							</h3>
							<div className="space-y-3">
								{[
									{ name: "Arctic Monkeys", percentage: 85 },
									{ name: "Tame Impala", percentage: 72 },
									{ name: "The Strokes", percentage: 58 },
								].map((artist, index) => (
									<div key={index} className="space-y-1">
										<div className="flex justify-between items-center">
											<span className="text-xs font-medium text-muted-foreground">
												{artist.name}
											</span>
											<span className="text-xs text-purple-400 font-semibold">
												{artist.percentage}%
											</span>
										</div>
										<div className="w-full bg-gray-800/30 rounded-full h-1.5 overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-purple-500/60 to-purple-400/60 rounded-full"
												style={{ width: `${artist.percentage}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="absolute inset-0 flex items-center justify-center z-10">
				<div className="text-center space-y-4 max-w-2xl mx-auto px-6">
					<h1 className="text-3xl lg:text-5xl font-bold goldtext leading-[2]">
						View Your Stats in Style
					</h1>
					<p className="text-lg lg:text-xl max-w-3xl mx-auto mb-6 text-foreground leading-relaxed">
						Get the inside scoop on what makes your music taste yours. Top
						genres. Listening streaks. Favorite albums. And more. All presented
						with elegant charts and animations — because data deserves good
						design too.
					</p>
				</div>
			</div>
		</motion.section>
	);
}

export const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
	viewport: { amount: 0.2 },
} satisfies MotionProps;
