import { keys, time } from "@/lib/constants.ts";
import type { SpotifyTokens } from "@/lib/types.ts";
import axios from "axios";

function generateCodeVerifier(length = 128) {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
	let text = "";
	const values = new Uint8Array(length);
	crypto.getRandomValues(values);
	for (let i = 0; i < length; i++) {
		text += possible.charAt(values[i] % possible.length);
	}
	return text;
}

async function generateCodeChallenge(codeVerifier: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await crypto.subtle.digest("SHA-256", data);

	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

function generateState() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export async function SpotifyLogin() {
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	const state = generateState();
	sessionStorage.setItem(keys.SessionStorage.SpotifyCodeVerifier, codeVerifier);
	sessionStorage.setItem(keys.SessionStorage.SpotifyState, state);

	const scope = [
		"user-read-playback-state",
		"user-modify-playback-state",
		"user-read-currently-playing",
		"playlist-read-private",
		"playlist-read-collaborative",
		"playlist-modify-public",
		"playlist-modify-private",
		"user-library-read",
		"user-library-modify",
		"user-read-recently-played",
		"user-top-read",
		"user-follow-read",
		"user-follow-modify",
		"streaming",
		"user-read-email",
		"user-read-private",
		"app-remote-control",
		"user-read-playback-position",
	].join(" ");

	const params = new URLSearchParams({
		response_type: "code",
		client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
		redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
		scope,
		state,
		code_challenge_method: "S256",
		code_challenge: codeChallenge,
	});

	window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function ExchangeSpotifyCodeForToken(
	code: string,
	state: string,
): Promise<SpotifyTokens> {
	try {
		if (state !== sessionStorage.getItem(keys.SessionStorage.SpotifyState)) {
			throw new Error("State mismatch.");
		}
		const codeVerifier = sessionStorage.getItem(
			keys.SessionStorage.SpotifyCodeVerifier,
		);
		if (!codeVerifier)
			throw new Error("Code verifier not found in session storage");
		const response = await axios.post<SpotifyTokens>(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
				client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
				code_verifier: codeVerifier,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);
		const expires_in = Date.now() + response.data.expires_in * time.Second;
		localStorage.setItem(
			keys.LocalStorage.SpotifyTokens,
			JSON.stringify({
				...response.data,
				expires_in,
			}),
		);
		return response.data;
	} catch (e) {
		console.error("Failed to exchange Spotify code for token:", e);
		throw new Error("Failed to exchange Spotify code for token");
	}
}

export async function RefreshSpotifyAccessToken(
	refreshToken: string,
): Promise<SpotifyTokens> {
	try {
		const response = await axios.post<SpotifyTokens>(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
				client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const expires_in = Date.now() + response.data.expires_in * time.Second;
		localStorage.setItem(
			keys.LocalStorage.SpotifyTokens,
			JSON.stringify({
				...response.data,
				expires_in,
			}),
		);

		return response.data.refresh_token
			? response.data
			: { ...response.data, refresh_token: refreshToken };
	} catch (e) {
		console.error("Failed to refresh Spotify access token:", e);
		throw e;
	}
}

export function LogoutUser() {
	localStorage.removeItem(keys.LocalStorage.SpotifyTokens);
	sessionStorage.removeItem(keys.SessionStorage.SpotifyCodeVerifier);
	sessionStorage.removeItem(keys.SessionStorage.SpotifyState);
	window.location.href = "/";
}

export async function IsUserAuthorized() {
	try {
		const tokens = JSON.parse<SpotifyTokens>(
			localStorage.getItem(keys.LocalStorage.SpotifyTokens) || "{}",
		);
		if (!tokens.access_token) {
			return false;
		}

		const isExpired = Date.now() >= tokens.expires_in - time.Minute * 5;

		if (isExpired && tokens.refresh_token) {
			const newTokens = await RefreshSpotifyAccessToken(tokens.refresh_token);
			return !!newTokens.access_token;
		}

		return isExpired ? false : !!tokens.access_token;
	} catch (error) {
		console.error("Error getting valid access token:", error);
		return false;
	}
}
