import type {
	QueryOptions,
	UseQueryOptions,
	UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export interface SpotifyTokens {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export interface MarqueeAlbumItem {
	position: `${number}`;
	primarybgcolor: string;
	secondarybgcolor: string;
	adamid: string;
	title: string;
	artwork: {
		width: number;
		url: string;
		height: number;
		textColor3: string;
		textColor2: string;
		textColor4: string;
		textColor1: string;
		bgColor: string;
		hasP3: boolean;
	};
	url: string;
	name: string;
	artistName: string;
}

/**
 * helpers
 */
export type CompoundQueryFlags = "default" | "suspense";
export type CompoundQueryOptionArgs<
	T extends Record<string, unknown>,
	F extends CompoundQueryFlags = "default",
> = (F extends "default"
	? Omit<UseQueryOptions, "queryKey" | "queryFn">
	: Omit<UseSuspenseQueryOptions, "queryKey" | "queryFn">) &
	T;
export type CompoundQueryOptions<T = unknown> = QueryOptions<T> & {
	queryKey: readonly unknown[];
	queryFn: UseSuspenseQueryOptions<T>["queryFn"];
};

export type StateWithSetter<T extends Record<string, unknown>> = T & {
	[K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};
