import { RefreshSpotifyAccessToken } from "@/lib/auth.ts";
import { keys, time } from "@/lib/constants.ts";
import type { SpotifyTokens } from "@/lib/types.ts";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const api = axios.create({
	baseURL: "https://api.spotify.com/v1",
});

api.interceptors.request.use(tokenInterceptor, (error: Error) => {
	return Promise.reject(error);
});

async function tokenInterceptor(config: InternalAxiosRequestConfig) {
	const tokens = JSON.parse<Partial<SpotifyTokens>>(
		localStorage.getItem(keys.LocalStorage.SpotifyTokens) || "{}",
	);
	if (tokens.access_token) {
		config.headers.Authorization = `Bearer ${tokens.access_token}`;
	}
	// Check if token is expired (with 5-minute buffer)
	const isExpired =
		tokens.expires_in && Date.now() >= tokens.expires_in - time.Minute * 5;

	if (isExpired && tokens.refresh_token) {
		try {
			await RefreshSpotifyAccessToken(tokens.refresh_token);
		} catch (e) {
			toast.error("Failed to authenticate");
			window.location.href = "/";
		}
	}
	return config;
}

export default api;
