import { useAnimationFrame } from "motion/react";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";

import { useMousePositionRef } from "@/hooks/use-mouse-position-ref.ts";
import { cn } from "@/lib/utils.ts";

interface FloatingContextType {
	registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
	unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
	children: ReactNode;
	className?: string;
	sensitivity?: number;
	easingFactor?: number;
}

export default function Floating({
	children,
	className,
	sensitivity = 1,
	easingFactor = 0.05,
	...props
}: FloatingProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const elementsMap = useRef(
		new Map<
			string,
			{
				element: HTMLDivElement;
				depth: number;
				currentPosition: { x: number; y: number };
			}
		>(),
	);
	const mousePositionRef = useMousePositionRef(containerRef);

	const registerElement = useCallback(
		(id: string, element: HTMLDivElement, depth: number) => {
			elementsMap.current.set(id, {
				element,
				depth,
				currentPosition: { x: 0, y: 0 },
			});
		},
		[],
	);

	const unregisterElement = useCallback((id: string) => {
		elementsMap.current.delete(id);
	}, []);

	useAnimationFrame(() => {
		if (!containerRef.current) return;

		elementsMap.current.forEach((data) => {
			const strength = (data.depth * sensitivity) / 20;

			// Calculate new target position
			const newTargetX = mousePositionRef.current.x * strength;
			const newTargetY = mousePositionRef.current.y * strength;

			// Check if we need to update
			const dx = newTargetX - data.currentPosition.x;
			const dy = newTargetY - data.currentPosition.y;

			// Update position only if we're still moving
			data.currentPosition.x += dx * easingFactor;
			data.currentPosition.y += dy * easingFactor;

			data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
		});
	});

	return (
		<FloatingContext.Provider value={{ registerElement, unregisterElement }}>
			<div
				ref={containerRef}
				className={cn("absolute top-0 left-0 w-full h-full", className)}
				{...props}
			>
				{children}
			</div>
		</FloatingContext.Provider>
	);
}

interface FloatingElementProps {
	children: ReactNode;
	className?: string;
	depth?: number;
}

export function FloatingElement({
	children,
	className,
	depth = 1,
}: FloatingElementProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(Math.random().toString(36).substring(7));
	const context = useContext(FloatingContext);

	useEffect(() => {
		if (!elementRef.current || !context) return;

		const nonNullDepth = depth ?? 0.01;

		context.registerElement(idRef.current, elementRef.current, nonNullDepth);
		return () => context.unregisterElement(idRef.current);
	}, [depth, context]);

	return (
		<div
			ref={elementRef}
			className={cn("absolute will-change-transform", className)}
		>
			{children}
		</div>
	);
}
