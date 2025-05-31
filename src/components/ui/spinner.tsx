import { cn } from "@/lib/utils";
import type * as React from "react";

type SpinnerSize = "1" | "2" | "3";

interface ResponsiveValue<T> {
	initial?: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
}

interface MarginProps {
	m?: string | ResponsiveValue<string>;
	mx?: string | ResponsiveValue<string>;
	my?: string | ResponsiveValue<string>;
	mt?: string | ResponsiveValue<string>;
	mr?: string | ResponsiveValue<string>;
	mb?: string | ResponsiveValue<string>;
	ml?: string | ResponsiveValue<string>;
}

interface SpinnerProps
	extends Omit<React.ComponentProps<"span">, "size">,
		MarginProps {
	size?: SpinnerSize | ResponsiveValue<SpinnerSize>;
	loading?: boolean;
	children?: React.ReactNode;
	className?: string;
}

function isResponsiveObject<T>(
	value: T | ResponsiveValue<T>,
): value is ResponsiveValue<T> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getResponsiveClasses<T extends string>(
	value: T | ResponsiveValue<T>,
	classNameTemplate: (val: T) => string,
): string {
	if (!isResponsiveObject(value)) {
		return classNameTemplate(value);
	}

	const classes: string[] = [];

	if (value.initial) classes.push(classNameTemplate(value.initial));
	if (value.sm)
		classes.push(`sm:${classNameTemplate(value.sm).replace(/^.*?:/, "")}`);
	if (value.md)
		classes.push(`md:${classNameTemplate(value.md).replace(/^.*?:/, "")}`);
	if (value.lg)
		classes.push(`lg:${classNameTemplate(value.lg).replace(/^.*?:/, "")}`);
	if (value.xl)
		classes.push(`xl:${classNameTemplate(value.xl).replace(/^.*?:/, "")}`);

	return classes.join(" ");
}

function getMarginClasses(props: MarginProps): string {
	const classes: string[] = [];

	const marginMap = {
		m: (val: string) => `m-${val}`,
		mx: (val: string) => `mx-${val}`,
		my: (val: string) => `my-${val}`,
		mt: (val: string) => `mt-${val}`,
		mr: (val: string) => `mr-${val}`,
		mb: (val: string) => `mb-${val}`,
		ml: (val: string) => `ml-${val}`,
	};

	Object.entries(marginMap).forEach(([key, classNameFn]) => {
		const value = props[key as keyof MarginProps];
		if (value) {
			if (isResponsiveObject(value)) {
				classes.push(getResponsiveClasses(value, classNameFn));
			} else {
				classes.push(classNameFn(value));
			}
		}
	});

	return classes.join(" ");
}

function getSizeClasses(
	size: SpinnerSize | ResponsiveValue<SpinnerSize> = "2",
): string {
	const sizeMap = {
		"1": "w-3 h-3",
		"2": "w-4 h-4",
		"3": "w-5 h-5",
	};

	return getResponsiveClasses(size, (val) => sizeMap[val]);
}

function Spinner({
	size = "2",
	loading = true,
	children,
	className,
	m,
	mx,
	my,
	mt,
	mr,
	mb,
	ml,
	...props
}: SpinnerProps) {
	const marginClasses = getMarginClasses({ m, mx, my, mt, mr, mb, ml });
	const sizeClasses = getSizeClasses(size);

	if (!loading) {
		return children || null;
	}

	const spinnerElement = (
		<span
			{...props}
			className={cn(
				"relative block opacity-65",
				sizeClasses,
				marginClasses,
				className,
			)}
			style={{
				...props.style,
			}}
		>
			{Array.from({ length: 8 }, (_, index) => (
				<span
					key={index}
					className="absolute top-0 animate-leaf-fade"
					style={{
						left: "calc(50% - 12.5% / 2)",
						width: "12.5%",
						height: "100%",
						transform: `rotate(${index * 45}deg)`,
						animationDelay: `${(-(8 - index) / 8) * 800}ms`,
					}}
				>
					<span
						className="block w-full bg-current rounded-sm"
						style={{ height: "30%" }}
					/>
				</span>
			))}
		</span>
	);

	if (children === undefined) {
		return spinnerElement;
	}

	return (
		<span className="relative flex items-center justify-center">
			<span
				aria-hidden
				className="invisible"
				style={{ display: "contents" }}
				// @ts-ignore - inert attribute
				inert=""
			>
				{children}
			</span>
			<span className="absolute inset-0 flex items-center justify-center">
				{spinnerElement}
			</span>
		</span>
	);
}

Spinner.displayName = "Spinner";

export { Spinner };
export type { SpinnerProps, SpinnerSize, MarginProps };
