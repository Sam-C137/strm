import { Button } from "@/components/ui/button.tsx";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { DefaultColors } from "@/lib/constants";
import { useUserSettings } from "@/lib/state/settings.ts";
import { CircleIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function PreferencesDialog() {
	const { theme, setTheme } = useTheme();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="border-b gap-4 w-full flex justify-start"
					variant="ghost"
				>
					<i className="icon-[solar--settings-bold] size-4" />
					Preferences
				</Button>
			</DialogTrigger>
			<DialogContent
				classNames={{
					content: "p-0",
					close: "md:left-4 md:top-4 w-max",
				}}
			>
				<Tabs
					defaultValue="general"
					className="gap-0 md:flex-row bg-sidebar h-max"
				>
					<div className="h-full md:min-h-80 pt-7 bg-sidebar">
						<TabsList className="md:flex-col md:flex-nowrap flex-wrap w-full md:w-fit bg-transparent p-4 md:pr-2 h-max rounded-none">
							<TabsTrigger
								value="general"
								className="cursor-pointer md:min-w-36 justify-start w-fit md:w-full h-fit data-[state=active]:shadow-none hover:bg-muted dark:hover:bg-[#ffffff1a] data-[state=active]:bg-muted dark:data-[state=active]:bg-[#ffffff1a] dark:data-[state=active]:border-transparent"
							>
								<i className="icon-[solar--settings-bold] size-4" />
								General
							</TabsTrigger>
							<TabsTrigger
								value="personalization"
								className="cursor-pointer md:min-w-36 justify-start w-fit md:w-full h-fit data-[state=active]:shadow-none hover:bg-muted dark:hover:bg-[#ffffff1a] data-[state=active]:bg-muted dark:data-[state=active]:bg-[#ffffff1a] dark:data-[state=active]:border-transparent"
							>
								<i className="icon-[solar--paint-roller-bold-duotone] size-4" />
								Personalization
							</TabsTrigger>
							<TabsTrigger
								value="account"
								className="cursor-pointer md:min-w-36 justify-start w-fit md:w-full h-fit hover:bg-muted dark:hover:bg-[#ffffff1a] data-[state=active]:shadow-none data-[state=active]:bg-muted dark:data-[state=active]:bg-[#ffffff1a] dark:data-[state=active]:border-transparent"
							>
								<i className="icon-[solar--user-circle-line-duotone] size-4" />
								Account
							</TabsTrigger>
						</TabsList>
					</div>
					<hr className="h-[unset] w-px bg-sidebar-border" />
					<TabsContent value="general" className="p-4 bg-background">
						<DialogHeader className="mb-2">
							<DialogTitle>General Preferences</DialogTitle>
						</DialogHeader>
						<DialogDescription className="mb-4">
							Adjust your general preferences such as theme and language.
						</DialogDescription>
						<ul className="flex flex-col gap-4">
							<li className="flex justify-between">
								Theme
								<Select value={theme} onValueChange={setTheme}>
									<SelectTrigger className="w-[150px]">
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light" className="gap-4">
											<i className="icon-[solar--sun-bold-duotone] size-4" />
											Light
										</SelectItem>
										<SelectItem value="dark" className="gap-4">
											<i className="icon-[solar--moon-bold-duotone] size-4" />
											Dark
										</SelectItem>
										<SelectItem value="system" className="gap-4">
											<i className="icon-[solar--monitor-bold-duotone] size-4" />
											System
										</SelectItem>
									</SelectContent>
								</Select>
							</li>
							<li className="flex justify-between">
								Language
								<Select disabled>
									<SelectTrigger className="w-[150px]">
										<SelectValue placeholder="English" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="english">English</SelectItem>
									</SelectContent>
								</Select>
							</li>
						</ul>
					</TabsContent>
					<TabsContent value="personalization" className="p-4 bg-background">
						<DialogHeader className="mb-2">
							<DialogTitle>Personalization</DialogTitle>
						</DialogHeader>
						<DialogDescription className="mb-4">
							Personalize your themes, colors and sound.
						</DialogDescription>
						<ul className="flex flex-col gap-4">
							<SidebarPosition />
							<AccentColor />
							<PrimaryColor />
						</ul>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}

function SidebarPosition() {
	const settings = useUserSettings();
	return (
		<li className="flex flex-col gap-2">
			Sidebar Position
			<RadioGroup
				defaultValue={settings.sidebarPosition}
				onValueChange={settings.setSidebarPosition}
				className="flex gap-7"
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="left" id="left" />
					<Label htmlFor="left">
						<i className="icon-[solar--mirror-left-bold-duotone] size-4" />
						Left
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="right" id="right" />
					<Label htmlFor="right">
						<i className="icon-[solar--mirror-right-bold-duotone] size-4" />
						Right
					</Label>
				</div>
			</RadioGroup>
		</li>
	);
}
function AccentColor() {
	const settings = useUserSettings();
	return (
		<li className="flex flex-col gap-2">
			<span className="leading-tight flex items-center gap-1">
				Accent Color
				<Tooltip>
					<TooltipTrigger className="flex items-center justify-center">
						<i className="icon-[solar--question-circle-line-duotone] size-4" />
					</TooltipTrigger>
					<TooltipContent>
						Accent color displayed on now playing screen
					</TooltipContent>
				</Tooltip>
			</span>
			<RadioGroup className="flex gap-1.5" defaultValue={settings.accent}>
				<RadioGroupItem
					value={DefaultColors[0]}
					id={DefaultColors[0]}
					aria-label="Blue"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-blue-500 bg-blue-500 dark:bg-blue-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
				/>
				<RadioGroupItem
					value={DefaultColors[1]}
					id={DefaultColors[1]}
					aria-label="Indigo"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-indigo-500 bg-indigo-500 dark:bg-indigo-500 shadow-none data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
				/>
				<RadioGroupItem
					value={DefaultColors[2]}
					id={DefaultColors[2]}
					aria-label="Pink"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-pink-500 bg-pink-500 dark:bg-pink-500 shadow-none data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
				/>
				<RadioGroupItem
					value={DefaultColors[3]}
					id={DefaultColors[3]}
					aria-label="red"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-red-500 bg-red-500 dark:bg-red-500 shadow-none data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
				/>
				<RadioGroupItem
					value={DefaultColors[4]}
					id={DefaultColors[4]}
					aria-label="orange"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-orange-500 bg-orange-500 dark:bg-orange-500 shadow-none data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
				/>
				<RadioGroupItem
					value={DefaultColors[5]}
					id={DefaultColors[5]}
					aria-label="yellow"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-yellow-500 bg-yellow-500 dark:bg-yellow-500 shadow-none data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
				/>
				<RadioGroupItem
					value={DefaultColors[6]}
					id={DefaultColors[6]}
					aria-label="emerald"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-emerald-500 bg-emerald-500 dark:bg-emerald-500 shadow-none data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
				/>
				<ColorPicker value="#5a289e">
					<RadioGroupItem
						value="custom"
						id="custom"
						checked={!DefaultColors.includes(settings.accent)}
						aria-label="Custom color"
						className="size-6 border-gray-400 shadow-none data-[state=checked]:border-gray-600"
						style={{
							background:
								"repeating-conic-gradient(#000 0% 25%, #9ca3af 25% 50%) 0 0/4px 4px",
						}}
						indicator={
							<CircleIcon
								className="size-4"
								style={{
									fill: settings.accent,
								}}
								strokeWidth="0"
							/>
						}
					/>
				</ColorPicker>
			</RadioGroup>
		</li>
	);
}

function PrimaryColor() {
	const settings = useUserSettings();
	return (
		<li className="flex flex-col gap-2">
			<span className="leading-tight flex items-center gap-1">
				Primary Color
			</span>
			<RadioGroup
				className="flex gap-1.5"
				defaultValue={settings.primaryColor}
				onValueChange={(color) =>
					color !== "custom" && settings.setPrimaryColor(color)
				}
			>
				<RadioGroupItem
					value={DefaultColors[0]}
					id={DefaultColors[0]}
					aria-label="Blue"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-blue-500 bg-blue-500 dark:bg-blue-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
				/>
				<RadioGroupItem
					value={DefaultColors[1]}
					id={DefaultColors[1]}
					aria-label="Indigo"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-indigo-500 bg-indigo-500 dark:bg-indigo-500 shadow-none data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
				/>
				<RadioGroupItem
					value={DefaultColors[2]}
					id={DefaultColors[2]}
					aria-label="Pink"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-pink-500 bg-pink-500 dark:bg-pink-500 shadow-none data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
				/>
				<RadioGroupItem
					value={DefaultColors[3]}
					id={DefaultColors[3]}
					aria-label="red"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-red-500 bg-red-500 dark:bg-red-500 shadow-none data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
				/>
				<RadioGroupItem
					value={DefaultColors[4]}
					id={DefaultColors[4]}
					aria-label="orange"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-orange-500 bg-orange-500 dark:bg-orange-500 shadow-none data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
				/>
				<RadioGroupItem
					value={DefaultColors[5]}
					id={DefaultColors[5]}
					aria-label="yellow"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-yellow-500 bg-yellow-500 dark:bg-yellow-500 shadow-none data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
				/>
				<RadioGroupItem
					value={DefaultColors[6]}
					id={DefaultColors[6]}
					aria-label="emerald"
					indicator={
						<i className="icon-[solar--check-read-line-duotone] text-white size-4" />
					}
					className="size-6 border-emerald-500 bg-emerald-500 dark:bg-emerald-500 shadow-none data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
				/>
				<ColorPicker
					value="#5a289e"
					onValueChange={({ hex }) => settings.setPrimaryColor(hex)}
				>
					<RadioGroupItem
						value="custom"
						id="custom"
						checked={!DefaultColors.includes(settings.primaryColor)}
						aria-label="Custom color"
						className="size-6 border-gray-400 shadow-none data-[state=checked]:border-gray-600"
						style={{
							background:
								"repeating-conic-gradient(#000 0% 25%, #9ca3af 25% 50%) 0 0/4px 4px",
						}}
						indicator={
							<CircleIcon
								className="size-4"
								style={{
									fill: settings.primaryColor,
								}}
								strokeWidth="0"
							/>
						}
					/>
				</ColorPicker>
			</RadioGroup>
		</li>
	);
}

// Up next: volume, volume mixer, primary color changer maybe sidebar bg and foreground changers
