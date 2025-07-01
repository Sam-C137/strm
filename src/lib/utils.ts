import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function applyDocumentStyle(key: string, value: string) {
	const style = document.documentElement
		.getAttribute("style")
		?.replace(new RegExp(`--${key}:\\s*[^;]+;?`, "g"), "")
		.trim();
	document.documentElement.setAttribute("style", `${style}--${key}: ${value};`);
}
